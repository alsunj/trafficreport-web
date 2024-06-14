import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'; 
import { VehicleService } from "../services/VehicleService";
import type { IVehicle } from "../types/IVehicles";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IAdditionalVehicle } from "../types/IVehicles";
import { AdditionalVehicleService } from "../services/AdditionalVehicleService";
import { Spinner } from "react-bootstrap";

interface AdditionalVehicleFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  vehicleViolationid: string;
}



const AdditionalVehicleForm: React.FC<AdditionalVehicleFormProps> = ({ onSubmit, onCancel, vehicleViolationid }) => {
  const VehicleEndpoint = "Vehicle/GetVehicles";
  const vehicleService = new VehicleService(VehicleEndpoint);
  const [vehicles, setVehicles] = useState<IVehicle []| null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles = await vehicleService.getAll();
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle){
      alert("Please fill out all fields.");
      return;
    }
    

    const additionalVehicleEndPoint = "AdditionalVehicle/post";
    const additionalVehicleService = new AdditionalVehicleService(additionalVehicleEndPoint);
    const additionalVehicle: IAdditionalVehicle = {
      vehicleId: selectedVehicle,
      vehicleViolationId: vehicleViolationid,
        };
    try {
      additionalVehicleService.add(additionalVehicle);
      onSubmit();

    } catch (error) {
      console.error("Error submitting vehicle:", error);
    }
    
  };

  if (vehicles === null) {
    return <div><Spinner animation="border" /></div>;
  }
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Additional Vehicle</h4>
      <hr />
      <Form.Group className="mb-3">
      <Form.Select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">Select Evidence</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>{vehicle.regNr}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  );
};

export default AdditionalVehicleForm;
