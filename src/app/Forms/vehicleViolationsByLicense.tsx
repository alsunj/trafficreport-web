import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from '../services/VehicleViolationService';

interface VehicleViolationsByLicenseProps {
    licensePlate: string | undefined;
}

const VehicleViolationsByLicense: React.FC<VehicleViolationsByLicenseProps> = ({ licensePlate }) => {
    let endpoint = `https://alsunjtrafficreport.azurewebsites.net/api/v1/violations/VehicleViolation/GetVehicleViolationsByLicensePlate/${licensePlate}`;
    let vehicleViolationService = new VehicleViolationService(endpoint);
    let [licenseVehicleViolations, setLicenseVehicleViolations] = useState<IVehicleViolation[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedVehicleViolations = await vehicleViolationService.getAll();
                setLicenseVehicleViolations(fetchedVehicleViolations);
            } catch (error) {
                setLicenseVehicleViolations(null);
                console.error("Error fetching vehicle violations:", error);
            }
        };

        fetchData();
    }, [licensePlate]);


    return (
        <div>
            <h1>Vehicle violations for {licensePlate?.toUpperCase()}</h1>
            <p>
            </p>
            {licenseVehicleViolations !== null || false ? (
            <Table striped bordered hover>
                <thead>
                <tr>
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
export default VehicleViolationsByLicense;
