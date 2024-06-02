import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from '../services/VehicleViolationService';
import '../../../styles.css';

interface VehicleViolationsByLicenseProps {
    licensePlate: string;
}

const VehicleViolationsByLicense: React.FC<VehicleViolationsByLicenseProps> = ({ licensePlate }) => {
    let endpoint = `VehicleViolation/GetVehicleViolationsByLicensePlate`;
    let vehicleViolationService = new VehicleViolationService(endpoint);
    let [licenseVehicleViolations, setLicenseVehicleViolations] = useState<IVehicleViolation[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedVehicleViolations = await vehicleViolationService.getAllByRegNr(licensePlate);
                console.log(fetchedVehicleViolations)
                setLicenseVehicleViolations(fetchedVehicleViolations);
            } catch (error) {
                setLicenseVehicleViolations(null);
                console.error("Error fetching vehicle violations:", error);
            }
        };

        fetchData();
    }, [licensePlate]);

    if (licenseVehicleViolations && licenseVehicleViolations.length === 0) {
        
            return <div>No Vehicle Violations for license plate {licensePlate.toUpperCase()}</div>;
        }

    return (
        <div>
            <h1>Vehicle violations for {licensePlate?.toUpperCase()}</h1>
            <p>
            </p>
            {licenseVehicleViolations !== null || false ? (
                <Table striped bordered hover className="medium-font">
                <thead>
                <tr>
                    <th className="medium-font">Description</th>
                    <th>Location Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {licenseVehicleViolations.map((vehicleViolation: IVehicleViolation) => (
                        <tr key={vehicleViolation.id}>
                            <td>{vehicleViolation.description}</td>
                            <td>{vehicleViolation.locationName}</td>
                            <td>{vehicleViolation.createdAt}</td>
                            <td>

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
