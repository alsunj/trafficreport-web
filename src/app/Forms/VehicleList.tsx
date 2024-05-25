import React, { useEffect,useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VehicleContext } from '../store/vehicleStore';
import type { IVehicle } from '../types/IVehicles';
import { VehicleService } from '../services/VehicleService';


const VehicleList: React.FC = () => {
    const endpoint = "https://alsunjtrafficreport.azurewebsites.net/api/v1/vehicles/Vehicle/GetVehicles";
    const { vehicles, setVehicles } = useContext(VehicleContext);
    const vehicleService = new VehicleService(endpoint);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedVehicles: IVehicle[] = await vehicleService.getAll();
          if (setVehicles) {
            setVehicles(fetchedVehicles);
          }
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };
  
      fetchData();
    }, [setVehicles]);
  
    if (vehicles === null) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Vehicles</h1>
        <p>
          <Link to="/Vehicle/create">Create new</Link>
        </p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vehicle Type ID</th>
              <th>Color</th>
              <th>Registration Number</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: IVehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.vehicleTypeId}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.regNr}</td>
                <td>{vehicle.rating}</td>
                <td>
                  <Link to={`/Vehicle/edit/${vehicle.id}`}>Edit</Link> | 
                  <Link to={`/Vehicle/delete/${vehicle.id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  
  export default VehicleList;
  