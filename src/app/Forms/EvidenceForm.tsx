import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IEvidence, IEvidenceType } from "../types/IEvidences";
import { useEffect, useState } from "react";
import { EvidenceTypeService } from "../services/EvidenceTypeService";
import { EvidenceService } from "../services/EvidenceService";

interface EvidenceFormProps {
}

const EvidenceForm: React.FC = () => {
  const endpoint = "EvidenceType/GetEvidenceTypes"
  const [evidenceTypes, setEvidenceTypes] = useState<IEvidenceType[] | null>(null);
  const [selectedEvidenceeType, setSelectedEvidenceType] = useState<string>("");
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // Set the selected file to state
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const endpoint1 = "Evidence/post";
    const evidenceService = new EvidenceService(endpoint1);
    event.preventDefault(); 
    const evidence: IEvidence = {
      EvidenceTypeId: selectedEvidenceeType,
      VehicleViolationId: "57261cad-56c3-4200-a512-ff28105b5e84",
      description: "geeg ",
      createdAt: new Date().toISOString(),     
    };
    if (selectedFile) {
      try{
        const result = evidenceService.postWithFile(evidence, selectedFile); // Pass selected file to post method
        console.log('Result:', evidence);
      }
      catch{
        console.error("No file selected");
      }
    } 
    
  };
  if (evidenceTypes === null) {
    return <div>Loading...</div>;
  }
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Evidence</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Select
          value={selectedEvidenceeType}
          onChange={(e) => setSelectedEvidenceType(e.target.value)}
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
        <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e)} />
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit Evidence</button>
      </div>
    </Form>
  );
};

export default EvidenceForm;
