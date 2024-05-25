import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AdditionalVehicleFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AdditionalVehicleForm: React.FC<AdditionalVehicleFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Additional Vehicle</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Incident Car Registration Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Incident Car Registration Number" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Incident Location</Form.Label>
        <Form.Control type="text" placeholder="Enter Incident Location" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Associated Car  Registration Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Associated Car Registration Number" />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </Form>
  );
};

export default AdditionalVehicleForm;
