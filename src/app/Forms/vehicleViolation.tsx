import React, { useEffect, useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IViolation } from '../types/IViolations';
import { ViolationService } from '../services/ViolatonService';
import type { IVehicleViolation } from '../types/IViolations';
import type { IVehicle } from '../types/IVehicles';
import { VehicleViolationService } from '../services/VehicleViolationService';
import { VehicleService } from '../services/VehicleService';
import { Spinner } from 'react-bootstrap';


interface VehicleViolationFormProps {
  latlng: string;
  onCancel: () => void;
  onSubmit: () => void;
  toggleViolationForm: () => void;
  toggleVehicleForm: () => void;
}
//console.log("jwt stuff" + JwtContext.Provider);


const VehicleViolationForm: React.FC<VehicleViolationFormProps> = ({
  latlng,
  onCancel,
  onSubmit,
  toggleViolationForm,
  toggleVehicleForm

}) => {
  const endpoint = "Violation/GetViolations";
  const vehicleendpoint = "Vehicle/GetVehicles"
  const [violations, setViolations] = useState<IViolation[] | null>(null);
  const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);
  const violationService = new ViolationService(endpoint);
  const vehicleService = new VehicleService(vehicleendpoint)
  const [selectedViolation, setSelectedViolation] = useState<string>("");
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles: IVehicle[] = await vehicleService.getAll();
        const fetchedViolations: IViolation[] = await violationService.getAll();
        if (setViolations) {
          setViolations(fetchedViolations);
          console.log("latlng on siin" + latlng);
        }
        if (setVehicles) {
          setVehicles(fetchedVehicles)

        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [setViolations]);
  const areAllFieldsFilled = (): boolean => {
    return (
      selectedViolation !== "" &&
      vehicleLicensePlate !== "" &&
      description !== "" &&
      locationName !== ""
    );
  };

  if (violations === null) {
    return <div><Spinner animation="border" /></div>;
  }
  if (vehicles == null) {
    return <div><Spinner animation="border" /></div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!areAllFieldsFilled()) {
      alert("Please fill out all fields.");
      return;
    }
    const endpoint1 = "VehicleViolation/post";
    const vehicleViolationService = new VehicleViolationService(endpoint1);
    const vehicleViolation: IVehicleViolation = {
      vehicleId: vehicleLicensePlate,
      violationId: selectedViolation,
      description: description,
      coordinates: latlng,
      locationName: locationName,
      createdAt: new Date().toISOString(),
    };
    try {
      vehicleViolationService.add(vehicleViolation);
      onSubmit();
    } catch (error) {

    }
    

  };

  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '500px' }}>
      <h4>Vehicle Violation</h4>
      <button type="submit" className="btn btn-primary" onClick={toggleViolationForm}>Create Violation</button>
      <button type="submit" className="btn btn-primary" onClick={toggleVehicleForm}>Create Vehicle</button>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Vehicle License Plate</Form.Label>
        <Form.Select
          value={vehicleLicensePlate}
          onChange={(e) => setVehicleLicensePlate(e.target.value)}
        >
          <option value="">Select Vehicle Reg NR</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>{vehicle.regNr}</option>
          ))}
        </Form.Select>

      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Violation</Form.Label>
        <Form.Select
          value={selectedViolation}
          onChange={(e) => setSelectedViolation(e.target.value)}
        >
          <option value="">Select Violation</option>
          {violations.map((violation) => (
            <option key={violation.id} value={violation.id}>{violation.violationName}</option>
          ))}
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Describe the incident"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Location Name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit VehicleViolation</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  );
};
export default VehicleViolationForm;
