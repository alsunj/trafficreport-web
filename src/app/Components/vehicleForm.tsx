// VehicleForm.tsx
import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


interface VehicleFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow">
      <h4>Vehicle</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Vehicle Type</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Choose vehicle</option>
          <option value="1">Mersu</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
      </div>
    </Form>
  );
};

export default VehicleForm;
