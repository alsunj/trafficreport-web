// ViolationForm.tsx
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import type { IViolation } from "../types/IViolations";
import { ViolationService } from "../services/ViolatonService";
import { EnumService } from '../services/EnumService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
interface ViolationFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ViolationForm: React.FC<ViolationFormProps> = ({ onSubmit, onCancel }) => {
  const EViolationTypeEndPoint = "Enums/GetViolationTypeEnums"
  const [violationTypes, setViolationTypes] = useState<string[] | null>(null);
  const enumService = new EnumService(EViolationTypeEndPoint);



  const [selectedviolationTypes, setSelectedViolationTypes] = useState<number | null>(null);
  const [violationName, setViolationName] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedViolationTypes = await enumService.getAll();
        setViolationTypes(fetchedViolationTypes);

      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (violationName === '' || selectedviolationTypes === null) {
      alert('Please fill out both Violation Name and Violation Type.');
      return;
    }

    const endpoint1 = "Violation/post";
    const violationService = new ViolationService(endpoint1);
    const violation: IViolation = {
      violationType: selectedviolationTypes!,
      violationName: violationName,
      severity: 3
    };
    try {
      violationService.add(violation);
      onSubmit();

    } catch (error) {

    }

  };

  if (violationTypes === null)
    {
      return <div><Spinner animation="border" /></div>;

    }
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '400px' }} >
      <h4>Violation</h4>
      <hr />
      <Form.Group className="mb-3">
      <Form.Group className="mb-3">
        <Form.Label>Violation Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Violation Name"
          value={violationName}
          onChange={(e) => setViolationName(e.target.value)}
        />
      </Form.Group>
      <Form.Label>Violation Type</Form.Label>
        <Form.Select
          value={selectedviolationTypes !== null ? selectedviolationTypes.toString() : ""}
          onChange={(e) => setSelectedViolationTypes(Number(e.target.value))}
        >
          <option value="">Select ViolationType</option>
          {violationTypes && violationTypes.map((violationType, index) => (
            <option key={index} value={index}>
              {violationType}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Report Violation</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </Form>
  );
};

export default ViolationForm;
