// VehicleForm.tsx
import React, { useEffect,  useState } from 'react';
import Form from 'react-bootstrap/Form';
import { VehicleTypeService } from '../services/VehicleTypeService';
import { VehicleService } from '../services/VehicleService';
import type { IVehicleType } from '../types/IVehicles';
import type { IVehicle } from '../types/IVehicles';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';


interface VehicleFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}



const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit, onCancel}) => {
  const endpoint = "VehicleType/GetVehicleTypes"
  const [ vehicleTypes, setVehicleTypes] = useState<IVehicleType[] | null>(null);
  const [ selectedVehicleTypes, setSelectedVehicleTypes] = useState<string>("");
  const vehicleService = new VehicleTypeService(endpoint);

  const [vehicleColor, setVehicleColor] = useState<string>("");
  const [vehicleRegNr, setVehicleRegNr] = useState<string>("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicleTypes = await vehicleService.getAll();
          setVehicleTypes(fetchedVehicleTypes);
        
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
  
    fetchData();
  }, []);
  
  if (vehicleTypes === null) {
    return <div><Spinner animation="border" /></div>;
  }
  const validateRegNr = (regNr: string) => {
    const regExp = /^[0-9]{3}[A-Za-z]{3}$/;
    return regExp.test(regNr);
  };
  const validateForm = () => {
    if (selectedVehicleTypes === null || vehicleColor === '' || vehicleRegNr === '') {
      alert('Please fill out all fields.');
      return false;
    }

    if (!validateRegNr(vehicleRegNr)) {
      alert('Registration number must be in format 999NNN.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
    

    const vehicleEndPoint = "Vehicle/post";
    const vehicleService = new VehicleService(vehicleEndPoint);
    const vehicle: IVehicle = {
      vehicleTypeId: selectedVehicleTypes,
      color: vehicleColor,
      regNr: vehicleRegNr
    };
    console.log(vehicle);
    try {
      const result = await vehicleService.add(vehicle);
      if (result.errors && result.errors.length > 0) {
          console.error("Error submitting vehicle:", result.errors);
          // Handle the specific error message
          if (result.errors.includes('Vehicle with that license plate is already in the system.')) {
              alert('Vehicle with that license plate is already in the system.');
          } else {
              alert('An error occurred while submitting the vehicle.');
          }
      } else {
          onSubmit();
      }
  } catch (error) {
      console.error("Error submitting vehicle:", error);
      alert('An unexpected error occurred.');
  }
    }
  };

  
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '400px' }} >
      <h4>Vehicle</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Select
          value={selectedVehicleTypes}
          onChange={(e) => setSelectedVehicleTypes(e.target.value)}
        >
        <option value="">Select VehicleType</option>
          {vehicleTypes.map((vehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id}>{vehicleType.vehicleTypeName}</option>
          ))}
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Color</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Vehicle Color"
          value={vehicleColor}
          onChange={(e) => setVehicleColor(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Reg Nr</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Vehicle Reg NR"
          value={vehicleRegNr}
          onChange={(e) => setVehicleRegNr(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Create</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

      </div>
    </Form>
  );
};

export default VehicleForm;
