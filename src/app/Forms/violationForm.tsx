// ViolationForm.tsx
import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ViolationFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ViolationForm: React.FC<ViolationFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow">
      <h4>Violation</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Violation Name</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Choose violation</option>
          <option value="1">Speeding</option>
          <option value="2">Parking</option>
          <option value="3">Signal Jumping</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Severity</Form.Label>
        <Form.Control type="number" />
      </Form.Group>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Report Violation</button>
      </div>
    </Form>
  );
};

export default ViolationForm;
