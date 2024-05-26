import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from '../services/VehicleViolationService';

interface VehicleViolationsByIdProps {
    id: string;
}

const VehicleViolationsById: React.FC<VehicleViolationsByIdProps> = ({ id }) => {
    const endpoint = `https://alsunjtrafficreport.azurewebsites.net/api/v1/violations/VehicleViolation/GetVehicleViolation`;
    const vehicleViolationService = new VehicleViolationService(endpoint);
    let [idVehicleViolations, setidVehicleViolations] = useState<IVehicleViolation| null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVehicleViolations : IVehicleViolation = await vehicleViolationService.getById(id);
                setidVehicleViolations(fetchedVehicleViolations);
                console.log("Fetched Vehicle Violations:", fetchedVehicleViolations);
                console.log("Error fetching vehicle violations:", idVehicleViolations);

            } catch (error) {
                console.error("Error fetching vehicle violations:", error);
                setidVehicleViolations(null);
            }
        };

        fetchData();
    }, []);

    if (idVehicleViolations  !== null)
        {
            return (
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
                            <tr key={idVehicleViolations.id}>
                                <td>{idVehicleViolations.vehicleId}</td>
                                <td>{idVehicleViolations.violationId}</td>
                                <td>{idVehicleViolations.appUserId}</td>
                                <td>{idVehicleViolations.description}</td>
                                <td>{idVehicleViolations.coordinates}</td>
                                <td>{idVehicleViolations.locationName}</td>
                                <td>{idVehicleViolations.createdAt}</td>
                                <td>
                                    <Link to={`/VehicleViolation/edit/${idVehicleViolations.id}`}>Edit</Link> |
                                    <Link to={`/VehicleViolation/delete/${idVehicleViolations.id}`}>Delete</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            );
        };
        }

       
export default VehicleViolationsById;
