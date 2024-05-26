import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface EvidenceFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EvidenceForm: React.FC<EvidenceFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Evidence</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Evidence Type Name</Form.Label>
        <Form.Select>
        <option>Enter Evidence Type Name</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter Description" />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit Evidence</button>
      </div>
    </Form>
  );
};

export default EvidenceForm;
