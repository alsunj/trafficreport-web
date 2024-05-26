import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from '../services/VehicleViolationService';

interface VehicleViolationsByLicenseProps {
    licensePlate: string;
}

const VehicleViolationsByLicense: React.FC<VehicleViolationsByLicenseProps> = ({ licensePlate }) => {
    const endpoint = `https://alsunjtrafficreport.azurewebsites.net/api/v1/violations/VehicleViolation/GetVehicleViolationsByLicensePlate/${licensePlate}`;
    const vehicleViolationService = new VehicleViolationService(endpoint);
    const [licenseVehicleViolations, setLicenseVehicleViolations] = useState<IVehicleViolation[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedVehicleViolations: IVehicleViolation[] = await vehicleViolationService.getAll();
                setLicenseVehicleViolations(fetchedVehicleViolations);
            } catch (error) {
                console.error("Error fetching vehicle violations:", error);
            }
        };

        fetchData();
    }, [licensePlate]); // Added licensePlate as a dependency

    if (licenseVehicleViolations === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Index</h1>
            <p>
                <Link to="/VehicleViolation/create">Create new</Link>
            </p>
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
                {licenseVehicleViolations.map((vehicleViolation: IVehicleViolation) => (
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
        </div>
    );
};

export default VehicleViolationsByLicense;
