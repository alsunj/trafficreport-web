import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IEvidence, IEvidenceType } from "../types/IEvidences";
import { useEffect, useState } from "react";
import { EvidenceTypeService } from "../services/EvidenceTypeService";
import { EvidenceService } from "../services/EvidenceService";
import { Spinner } from "react-bootstrap";
interface EvidenceFormProps {
  vehicleViolationId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const EvidenceForm: React.FC<EvidenceFormProps> = ({ vehicleViolationId,  onSubmit, onCancel }) => {
  const endpoint = "EvidenceType/GetEvidenceTypes"
  const [evidenceTypes, setEvidenceTypes] = useState<IEvidenceType[] | null>(null);
  const [selectedEvidenceeType, setSelectedEvidenceType] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const evidenceTypeService = new EvidenceTypeService(endpoint);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicleTypes = await evidenceTypeService.getAll();
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 255) {
      setDescription(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvidenceeType || !description || !selectedFile) {
      alert("Please fill out all fields.");
      return;
    }
    const endpoint1 = "Evidence/post";
    const evidenceService = new EvidenceService(endpoint1);
    const evidence: IEvidence = {
      evidenceTypeId: selectedEvidenceeType,
      vehicleViolationId: vehicleViolationId,
      description: description,
      createdAt: new Date().toISOString(),
    };
    if (selectedFile) {
      try {
        evidenceService.postWithFile(evidence, selectedFile); // Pass selected file to post method
        onSubmit();
      }
      catch {
        console.error("No file selected");
      }
      
    }

  };

  if (evidenceTypes === null) {
    return <div><Spinner animation="border" /></div>;
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
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Form.Text className="text-muted">
          {description.length}/255 characters
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e)} />
      </Form.Group>

      <div className="d-grid gap-2">
      <button type="submit" className="btn btn-primary">Submit Evidence</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Go Back</button>
      </div>
    </Form>
  );
};

export default EvidenceForm;
