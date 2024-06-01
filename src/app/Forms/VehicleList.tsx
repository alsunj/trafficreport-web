import React, { useEffect,  useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { IVehicle } from '../types/IVehicles';
import { VehicleService } from '../services/VehicleService';
import type { IVehicleType } from '../types/IVehicles';
import { VehicleTypeService } from '../services/VehicleTypeService';
interface VehicleListProps {
  licensePlate: string;
}


const VehicleList: React.FC<VehicleListProps> = ({licensePlate}) => {
    const endpoint = "Vehicle/GetVehicleByLicensePlate";
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const vehicleService = new VehicleService(endpoint);

    const VehicleTypeEndPoint = "VehicleType"
    const [ vehicleType, setVehicleType] = useState<IVehicleType | null>(null);
    const vehicleTypeService = new VehicleTypeService(VehicleTypeEndPoint);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedVehicle = await vehicleService.get(licensePlate);
          setVehicle(fetchedVehicle);

          if (fetchedVehicle) {
            const fetchedVehicleType = await vehicleTypeService.get(fetchedVehicle.vehicleTypeId!);
            setVehicleType(fetchedVehicleType);
          }
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };
  
      fetchData();
    }, [licensePlate]);
  
    if (vehicle === null) {
      return <div>No Vehcile found with this regnr {licensePlate}</div>;
    }
  
    return (
      <div>
        <h1>Vehicle Details</h1>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>VehicleName</td>
              <td>{vehicleType?.vehicleTypeName}</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>{vehicle.color}</td>
            </tr>
            <tr>
              <td>Registration Number</td>
              <td>{vehicle.regNr}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{vehicle.rating}</td>
            </tr>
          </tbody>
        </Table>

      </div>
    );
  };
  
  export default VehicleList;
  