import React, { useEffect , useState} from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicleViolation } from '../types/IViolations';
import { VehicleViolationService } from "../services/VehicleViolationService";
import { Spinner } from "react-bootstrap";
/*const VehicleViolations: React.FC = () => {
    const endpoint = "VehicleViolation/GetVehicleViolations";

    const [ vehicleViolations, setVehicleViolations ] = useState<IVehicleViolation[] | null>(null);
    const vehicleViolationService = new VehicleViolationService(endpoint);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch vehicle violations data from API or context
                // Replace this with your actual logic to fetch vehicle violations
                const fetchedVehicleViolations: IVehicleViolation[]  = await vehicleViolationService.getAll();
                if (setVehicleViolations) {
                    setVehicleViolations(fetchedVehicleViolations);
                }
            } catch (error) {
                console.error("Error fetching vehicle violations:", error);
            }
        };

        fetchData();
    }, [setVehicleViolations]);

    if (vehicleViolations === null) {
        return <div><Spinner animation="border" /></div>;
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
                    {vehicleViolations.map((vehicleViolation: IVehicleViolation) => (
                        <tr key={vehicleViolation.id}>
                            <td>{vehicleViolation.vehicleId}</td>
                            <td>{vehicleViolation.violationId}</td>
                            <td>{vehicleViolation.appUserId}</td>
                            <td>{vehicleViolation.description}</td>
                            <td>{vehicleViolation.coordinates}</td>
                            <td>{vehicleViolation.locationName}</td>
                            <td>{vehicleViolation.createdAt}</td>
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default VehicleViolations;*/