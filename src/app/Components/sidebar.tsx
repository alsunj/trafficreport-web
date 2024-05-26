import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import VehicleViolationsByLicense from '@/app/Forms/vehicleViolationsByLicense';

const Sidebar: React.FC = () => {
    const [show, setShow] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [submittedPlate, setSubmittedPlate] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedPlate(licensePlate);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {submittedPlate && (
                        <VehicleViolationsByLicense licensePlate={submittedPlate} />
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Sidebar;
