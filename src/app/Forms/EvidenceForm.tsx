import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IEvidenceType } from "../types/IEvidences";
import { useEffect, useState } from "react";
import { EvidenceTypeService } from "../services/EvidenceTypeService";

interface EvidenceFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EvidenceForm: React.FC<EvidenceFormProps> = ({ onSubmit }) => {
  const endpoint = "EvidenceType/GetEvidenceTypes"
  const [ evidenceTypes, setEvidenceTypes] = useState<IEvidenceType[] | null>(null);
  const [ selectedEvidenceeTypes, setSelectedEvidenceTypes] = useState<string>("");
  const evidenceTypeService = new EvidenceTypeService(endpoint);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicleTypes: IEvidenceType[] = await evidenceTypeService.getAll();
         setEvidenceTypes(fetchedVehicleTypes);
        
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
  
    fetchData();
  }, []);
  if (evidenceTypes === null) {
    return <div>Loading...</div>;
  }
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Evidence</h4>
      <hr />
      <Form.Group className="mb-3">
      <Form.Select
          value={selectedEvidenceeTypes}
          onChange={(e) => setSelectedEvidenceTypes(e.target.value)}
        >
        <option value="">Select Evidence</option>
          {evidenceTypes.map((evidenceType) => (
            <option key={evidenceType.id} value={evidenceType.id}>{evidenceType.evidenceTypeName}</option>
          ))}
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
