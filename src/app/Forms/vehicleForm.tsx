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

  const handleSubmit = () => {

    const vehicleEndPoint = "Vehicle/post";
    const vehicleService = new VehicleService(vehicleEndPoint);
    const vehicle: IVehicle = {
      vehicleTypeId: selectedVehicleTypes,
      color: "green",
      regNr: "555grn"
    };
    try {
      vehicleService.add(vehicle);
    } catch (error) {

    }
    finally {
      onSubmit();
    }


  };

  
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '300px' }} >
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
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Create</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

      </div>
    </Form>
  );
};

export default VehicleForm;
