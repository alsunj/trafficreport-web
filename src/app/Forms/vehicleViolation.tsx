// VehicleViolationForm.tsx
import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface VehicleViolationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const VehicleViolationForm: React.FC<VehicleViolationFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '500px' }}>
      <h4>Vehicle Violation</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Vehicle License Plate</Form.Label>
        <Form.Control type="text" placeholder="Vehicle License Plate" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Violation</Form.Label>
        <Form.Control type="text" placeholder="Insert Violation" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Describe the incident" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Location Name" />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit Violation</button>
      </div>
    </Form>
    //need coordinates on placed spot.
    //appuserid from jwt
  );
};

export default VehicleViolationForm;
