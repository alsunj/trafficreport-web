import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import VehicleViolations from "@/app/Forms/vehicleViolations";

function Sidebar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main manu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <VehicleViolations/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;