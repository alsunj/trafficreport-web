import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



interface VehicleViolationCommentsByIdProps {
    id: string;
}
const VehicleViolationComments: React.FC<VehicleViolationCommentsByIdProps> = ({ id }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Car regnr</th>
            <th>color</th>
            <th>vehicleName</th>
          </tr>
        </thead>
      </Table>
      
    </div>
  );
};

export default VehicleViolationComments;
