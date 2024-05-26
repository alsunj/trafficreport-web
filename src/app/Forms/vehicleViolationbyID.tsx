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
    const endpoint = `https://alsunjtrafficreport.azurewebsites.net/api/v1/violations/VehicleViolation/GetVehicleViolation/${id}`;
    const vehicleViolationService = new VehicleViolationService(endpoint);
    let [idVehicleViolations, setidVehicleViolations] = useState<IVehicleViolation[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const fetchedVehicleViolations = await vehicleViolationService.getAll();
                if(idVehicleViolations){
                    setidVehicleViolations(fetchedVehicleViolations);
                    console.log(fetchedVehicleViolations);
                    console.log(idVehicleViolations);
                }

            }
            catch(error){
                console.log("error")
                await setidVehicleViolations(null);
            }
        };

        fetchData();
    }, [setidVehicleViolations]);


    return (
        <div>                
            {idVehicleViolations !== null || false ? (
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
                        {idVehicleViolations.map((vehicleViolation: IVehicleViolation) => (
                            <tr key={vehicleViolation.id}>
                                <td>{vehicleViolation.vehicleId}</td>
                                <td>{vehicleViolation.violationId}</td>
                                <td>{vehicleViolation.appUserId}</td>
                                <td>{vehicleViolation.description}</td>
                                <td>{vehicleViolation.coordinates}</td>
                                <td>{vehicleViolation.locationName}</td>
                                <td>{vehicleViolation.createdAt}</td>
                                <td>
                                    <Link to={`/VehicleViolation/edit/${vehicleViolation.id}`}>Edit</Link> |
                                    <Link to={`/VehicleViolation/delete/${vehicleViolation.id}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
             ) : (
                <tr>
                <td colSpan={5}>No violations found for this license plate.</td>
                </tr>
                )}
        </div>
    ); 
};
export default VehicleViolationsById;
