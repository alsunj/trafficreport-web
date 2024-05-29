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
import VehicleViolationComments from "./VehicleViolationComments";
import { Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';


interface VehicleViolationsByIdProps {
    id: string;
}

const VehicleViolationsById: React.FC<VehicleViolationsByIdProps> = ({ id }) => {
    const VehicleViolationendpoint = `VehicleViolation`;
    const EvidenceEndpoint = 'Evidence/GetEvidences';
    const CommentEndpoint = 'Comment/GetAllVehicleViolationCommentsWithNoParentCommentId';
    const AdditionalVehicleEndpoint = ''
    const additionalVehicleService = new AdditionalVehicleService(AdditionalVehicleEndpoint);
    const evidenceService = new EvidenceService(EvidenceEndpoint);
    const commentService = new CommentService(CommentEndpoint);


    const vehicleViolationService = new VehicleViolationService(VehicleViolationendpoint);
    const [idVehicleViolation, setidVehicleViolation] = useState<IVehicleViolation | null>(null);
    const [comments, setComments] = useState<IComment []| null>(null);
    const [evidences, setEvidences] = useState<IEvidence[] | null>(null);
    const [additionalVehicles, setAdditionalVehicles] = useState<IAdditionalVehicle[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVehicleViolation: IVehicleViolation = await vehicleViolationService.get(id);
                setidVehicleViolation(fetchedVehicleViolation);
                const fetchedComments: IComment[] = await commentService.getAllById(id);
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

    if (idVehicleViolation !== null) {
        return (
            <div>
                <Carousel interval={null} >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/wCwHNY1/bg1.png"
                        />

                        <Carousel.Caption className="top-center">
                            <h1 className="black-text">Vehicle Violation</h1>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Location Name</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={idVehicleViolation.id}>
                                        <td>{idVehicleViolation.description}</td>
                                        <td>{idVehicleViolation.locationName}</td>
                                        <td>{idVehicleViolation.createdAt}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <h1 className="black-text">Vehicle</h1>
                            <Table striped bordered hover>
                            <thead>
                                    <tr>
                                        <th>Car regnr</th>
                                        <th>color</th>
                                        <th>vehicleName</th>
                                    </tr>
                                </thead>
                            </Table>
                            <h1 className="black-text">Additional Vehicles</h1>
                            <Table striped bordered hover>
                            <thead>
                                    <tr>
                                    <th><Link to={`/VehicleViolation/edit/${idVehicleViolation.id}`}>Create</Link>
                                        </th>
                                        <th>Car regnr</th>
                                        <th>color</th>
                                        <th>vehicleName</th>
                                        
                                    </tr>

                                    <tr key={idVehicleViolation.id}>
                                        <td></td>
                                    <td>Car regnr</td>
                                    <td>color</td>
                                    <td>vehicleName</td>
                                    </tr>

                                </thead>
                            </Table>


                        </Carousel.Caption>


                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/wCwHNY1/bg1.png"
                        />

                        <Carousel.Caption className="top-center">
                            <h1 className="black-text">Comments</h1>

                            <VehicleViolationComments  id={id}/>
                                


                        </Carousel.Caption>


                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/wCwHNY1/bg1.png"
                        />

                        <Carousel.Caption className="top-center">
                            <h1 className="black-text">Evidence</h1>
                            

                                


                        </Carousel.Caption>


                    </Carousel.Item>
                </Carousel>

            </div>

        );
    };
}


export default VehicleViolationsById;
