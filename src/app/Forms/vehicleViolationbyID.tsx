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
import type { IVehicle } from "../types/IVehicles";
import type { IVehicleType } from "../types/IVehicles";
import { VehicleService } from "../services/VehicleService";
import { VehicleTypeService } from "../services/VehicleTypeService";
import VehicleViolationComments from "./VehicleViolationComments";
import Carousel from 'react-bootstrap/Carousel';
import CloseButton from 'react-bootstrap/CloseButton';


interface VehicleViolationsByIdProps {
    vehicleViolationId: string;
    showVehicleViolationsById: boolean;
    onSubmit: () => void;
    onClose: () => void;
    toggleEvidenceForm: () => void;
    toggleCommentForm: (ParentCommentid?: string) => void;
    toggleAdditionalVehicleForm: () => void;

}

const VehicleViolationsById: React.FC<VehicleViolationsByIdProps> = ({ vehicleViolationId, showVehicleViolationsById, onSubmit, onClose, toggleEvidenceForm, toggleCommentForm, toggleAdditionalVehicleForm }) => {
    const VehicleViolationendpoint = `VehicleViolation`;
    const EvidenceEndpoint = 'Evidence/GetAllEvidencesByVehicleViolationId';
    const CommentEndpoint = 'Comment/GetAllVehicleViolationCommentsWithNoParentCommentId';
    const AdditionalVehicleEndpoint = 'AdditionalVehicle/GetAdditionalVehicleByVehicleViolation'
    const VehicleEndpoint = "Vehicle";
    const VehicleTypeEndpoint = "VehicleType/GetVehicleTypes"

    const vehicleTypeService = new VehicleTypeService(VehicleTypeEndpoint);
    const vehicleService = new VehicleService(VehicleEndpoint);
    const additionalVehicleService = new AdditionalVehicleService(AdditionalVehicleEndpoint);
    const evidenceService = new EvidenceService(EvidenceEndpoint);
    const commentService = new CommentService(CommentEndpoint);
    const vehicleViolationService = new VehicleViolationService(VehicleViolationendpoint);

    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [additionalVehicles, setAdditionalVehicles] = useState<IVehicle[] | null>(null);
    const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[] | null>(null);
    const [idVehicleViolation, setidVehicleViolation] = useState<IVehicleViolation | null>(null);
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [evidences, setEvidences] = useState<IEvidence[] | null>(null);
    const [additionalVehicleIds, setAdditionalVehicleIds] = useState<IAdditionalVehicle[] | null>(null);
    

    const [fetchCount, setFetchCount] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            try {

                const fetchedVehicleViolation = await vehicleViolationService.get(vehicleViolationId);
                setidVehicleViolation(fetchedVehicleViolation);

                const fetchedComments: IComment[] = await commentService.getAllById(vehicleViolationId);
                setComments(fetchedComments);

                const fetchedEvidences: IEvidence[] = await evidenceService.getAllById(vehicleViolationId);
                setEvidences(fetchedEvidences);

                const fetchedVehicleTypes = await vehicleTypeService.getAll();
                setVehicleTypes(fetchedVehicleTypes);
                console.log(idVehicleViolation)
                if (idVehicleViolation) {
                    const vehicleId = idVehicleViolation.vehicleId
                    const fetchedVehicle: IVehicle = await vehicleService.get(vehicleId)
                    setVehicle(fetchedVehicle);

                    const fetchedAdditionalVehicleIds: IAdditionalVehicle[] = await additionalVehicleService.getAllById(vehicleViolationId);
                    setAdditionalVehicleIds(fetchedAdditionalVehicleIds);

                    if (additionalVehicleIds) {
                        const additionalVehiclePromises = additionalVehicleIds.map(async (additionalVehicleId) => {
                            const fetchedAdditionalVehicle: IVehicle = await vehicleService.get(additionalVehicleId.vehicleId);
                            return fetchedAdditionalVehicle;
                        });
                        const additionalVehiclesData = await Promise.all(additionalVehiclePromises);
                        setAdditionalVehicles(additionalVehiclesData);
                    }


                }

            } catch (error) {
                console.error("Error fetching vehicle violations:", error);
                setidVehicleViolation(null);
            }
            finally {
                setFetchCount(prevCount => prevCount + 1);
            }
        };

        if (fetchCount < 10) {
            fetchData();
        }
    }, [fetchCount]);

    if (idVehicleViolation && vehicleTypes !== null) {
        return (
            <div>
                <div className="top-leftbutton">
                    <CloseButton onClick={onClose} />
                </div>
                <Carousel interval={null} >
                    <Carousel.Item>

                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/wCwHNY1/bg1.png"
                        />

                        <Carousel.Caption className="top-center">
                        <h4 className="top-right" onClick={toggleEvidenceForm}>Create Evidence</h4>

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
                                <tbody>
                                    {vehicle && (
                                        <tr key={vehicle.id}>
                                            <td>{vehicle.regNr}</td>
                                            <td>{vehicle.color}</td>
                                            <td>
                                                {vehicleTypes && vehicleTypes.find(type => type.id === vehicle.vehicleTypeId)?.vehicleTypeName}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <h1 className="black-text">Additional Vehicles</h1>
                            <h4 className="black-text" onClick={toggleAdditionalVehicleForm}>Create AdditionalVehicle</h4>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Car regnr</th>
                                        <th>Color</th>
                                        <th>Vehicle Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {additionalVehicles && additionalVehicles.map((vehicle, index) => {
                                        const vehicleType = vehicleTypes.find(type => type.id === vehicle.vehicleTypeId);
                                        return (
                                            <tr key={index}>
                                                <td>{vehicle.regNr}</td>
                                                <td>{vehicle.color}</td>
                                                <td>{vehicleType ? vehicleType.vehicleTypeName : ''}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
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
                            <h4 className="top-right" onClick={() => toggleCommentForm(undefined)}>Create Comment</h4>

                            {comments && comments.map((comment) => (
                                <Table striped bordered hover key={comment.id}>
                                    <thead>
                                        <tr>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{comment.commentText}</td>
                                        </tr>
                                        <h4 className="black-text" onClick={() => toggleCommentForm(comment.id)}>Create Comment</h4>

                                        <tr key={`${comment.id}-subcomments`}>
                                            <td colSpan={1}>
                                            <VehicleViolationComments id={comment.id ?? ''} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            ))}
                        </Carousel.Caption>
                    </Carousel.Item>
                    {evidences && evidences.map((evidence) => (
                        <Carousel.Item key={evidence.id}>
                            <img className="d-block w-100" src={"https://i.ibb.co/wCwHNY1/bg1.png"} alt={`Evidence ${evidence.id}`} />
                            <Carousel.Caption className="top-center">
                                <a href={evidence.file} className="top-right">Link to Image</a>

                                <h1 className="black-text">Evidence</h1>
                                <h5 className="black-text">{evidence.description}</h5>
                                <br />
                                <img src={`${evidence.file}`} alt={`Evidence file ${evidence.file}`} className="additional-evidence-image" />
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>

            </div>

        );
    };
}


export default VehicleViolationsById;
