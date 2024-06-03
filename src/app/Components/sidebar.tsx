import React, {useContext, useEffect, useState} from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import VehicleViolationsByLicense from '@/app/Forms/vehicleViolationsByLicense';
import FieldSubmit from "@/app/Components/fieldSubmit";

import VehicleList from '../Forms/VehicleList';

import '../../../styles.css';
import {JwtContext} from "@/app/routes/JwtContext";
import {IdentityService} from "@/app/services/IdentityService";
import LoginForm from "@/app/routes/Identity/loginForm";
import RegisterForm from "@/app/routes/Identity/registerForm";

interface SidebarProps {
    onChoose: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({onChoose}) => {
    const [show, setShow] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [submittedPlate, setSubmittedPlate] = useState('');
    const jwtContext = useContext(JwtContext);


    const [loginValues, setLoginValues] = useState({ email: "", password: "" });
    const [registerValues, setRegisterValues] = useState({ email: "", password: "" });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const identityService = new IdentityService('/api/v1/identity/Account/');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleToggleRegistration = () => setShowRegistrationForm(!showRegistrationForm);
    const handleToggleLogin = () => setShowLoginForm(!showLoginForm);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedPlate(licensePlate);
    };

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValues({ ...loginValues, [event.target.name]: event.target.value });
    };

    const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterValues({ ...registerValues, [event.target.name]: event.target.value });
    };

    const handleLoginSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!loginValues.email || !loginValues.password) {
            setValidationErrors(["Please fill in all fields."]);
            return;
        }

        setValidationErrors([]);

        try {
            const jwtData = await identityService.login(loginValues);

            if (!jwtData) {
                setValidationErrors(["Invalid email or password."]);
                return;
            }

            if (jwtContext?.setJwtResponse) {
                jwtContext.setJwtResponse(jwtData);
            }
            window.location.reload()
            handleClose();
        } catch (error) {
            setValidationErrors(["An error occurred during login. Please try again later."]);
        }
    };

    const handleRegisterSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!registerValues.email || !registerValues.password) {
            setValidationErrors(["Please fill in all fields."]);
            return;
        }

        setValidationErrors([]);

        try {
            const registerData = await identityService.register(registerValues);

            if (!registerData) {
                setValidationErrors(["Registration failed. Please try again."]);
                return;
            }
            handleClose();
        } catch (error) {
            setValidationErrors(["An error occurred during registration. Please try again later."]);
        }
    };
    const handleViolationChoose = (id: string) => {

        console.log("Selected violation ID:", id);
        onChoose(id);
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Main Menu
            </Button>

            <Offcanvas className="custom-offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main menu</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {!jwtContext?.jwtResponse && (
                        <>
                            <Button variant="primary" onClick={handleToggleLogin}>
                                Login
                            </Button>
                            {showLoginForm && (
                                <LoginForm
                                    values={loginValues}
                                    handleChange={handleLoginChange}
                                    onSubmit={handleLoginSubmit}
                                    validationErrors={validationErrors}
                                />
                            )}
                            <Button variant="primary" onClick={handleToggleRegistration}>
                                Register
                            </Button>
                            {showRegistrationForm && (
                                <RegisterForm
                                    values={registerValues}
                                    handleChange={handleRegisterChange}
                                    onSubmit={handleRegisterSubmit}
                                    validationErrors={validationErrors}
                                />
                            )}
                        </>
                    )}
                    {jwtContext?.jwtResponse && (
                        <Button onClick={() => jwtContext!.setJwtResponse && jwtContext!.setJwtResponse(null)}>Log out</Button>
                    )}
                    <FieldSubmit
                        licensePlate={licensePlate}
                        setLicensePlate={setLicensePlate}
                        onSubmit={handleSubmit}
                    />
                    {submittedPlate && (
                        <>
                            <VehicleList licensePlate={submittedPlate} />
                            <VehicleViolationsByLicense licensePlate={submittedPlate} onChoose={handleViolationChoose} />                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Sidebar;
