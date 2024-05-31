// ViolationForm.tsx
import React from "react";
import Form from 'react-bootstrap/Form';
import type { IViolation } from "../types/IViolations";
import { ViolationService } from "../services/ViolatonService";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ViolationFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ViolationForm: React.FC<ViolationFormProps> = ({ onSubmit, onCancel}) => {


  const handleSubmit = () => {

    const endpoint1 = "Violation/post";
    const violationService = new ViolationService(endpoint1);
    const violation: IViolation = {
      violationType: 3 ,
      violationName: "55",
      severity: 5
    };
    try {
      violationService.add(violation);
    } catch (error) {

    }
    finally {
      onSubmit();
    }


  };
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow">
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
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  );
};

export default ViolationForm;
