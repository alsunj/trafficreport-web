import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from '../services/VehicleViolationService';
import { CommentService } from "../services/CommentService";
import { AdditionalVehicleService } from "../services/AdditionalVehicleService";
import { EvidenceService } from "../services/EvidenceService";
import type { IComment } from "../types/IEvidences";
import type { IEvidence } from "../types/IEvidences";
import type { IAdditionalVehicle } from "../types/IVehicles";
import Carousel from 'react-bootstrap/Carousel';


interface VehicleViolationsByIdProps {
    id: string;
}

const VehicleViolationsById: React.FC<VehicleViolationsByIdProps> = ({ id }) => {
    const VehicleViolationendpoint = `VehicleViolation`;
    const EvidenceEndpoint = '';
    const CommentEndpoint = '';
    const AdditionalVehicleEndpoint = ''
    const additionalVehicleService = new AdditionalVehicleService(AdditionalVehicleEndpoint);
    const evidenceService = new EvidenceService(EvidenceEndpoint);
    const commentService = new CommentService(CommentEndpoint);


    const vehicleViolationService = new VehicleViolationService(VehicleViolationendpoint);
    const [idVehicleViolation, setidVehicleViolation] = useState<IVehicleViolation| null>(null);
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [evidences, setEvidences] = useState<IEvidence[] | null>(null);
    const [additionalVehicles, setAdditionalVehicles] = useState<IAdditionalVehicle[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVehicleViolation : IVehicleViolation = await vehicleViolationService.get(id);
                setidVehicleViolation(fetchedVehicleViolation);
                const fetchedComments: IComment[] = await commentService.getAll();
                setComments(fetchedComments);

                const fetchedEvidences: IEvidence[] = await evidenceService.getAll();
                setEvidences(fetchedEvidences);

                const fetchedAdditionalVehicles: IAdditionalVehicle[] = await additionalVehicleService.getAll();
                setAdditionalVehicles(fetchedAdditionalVehicles);

                console.log("Fetched Vehicle Violations:", fetchedVehicleViolation);
                console.log("Error fetching vehicle violations:", idVehicleViolation);

            } catch (error) {
                console.error("Error fetching vehicle violations:", error);
                setidVehicleViolation(null);
            }
        };

        fetchData();
    }, []);

    if (idVehicleViolation  !== null)
        {
            return (
                <Carousel>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Vehicle ID</th>
                                <th>Violation ID</th>
                                <th>Account ID</th>
                                <th>Description</th>
                                <th>Coordinates</th>
                                <th>Location Name</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={idVehicleViolation.id}>
                                <td>{idVehicleViolation.vehicleId}</td>
                                <td>{idVehicleViolation.violationId}</td>
                                <td>{idVehicleViolation.appUserId}</td>
                                <td>{idVehicleViolation.description}</td>
                                <td>{idVehicleViolation.coordinates}</td>
                                <td>{idVehicleViolation.locationName}</td>
                                <td>{idVehicleViolation.createdAt}</td>
                                <td>
                                    <Link to={`/VehicleViolation/edit/${idVehicleViolation.id}`}>Edit</Link> |
                                    <Link to={`/VehicleViolation/delete/${idVehicleViolation.id}`}>Delete</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Carousel.Item>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
                    
                </div>
                </Carousel>

            );
        };
        }

       
export default VehicleViolationsById;
