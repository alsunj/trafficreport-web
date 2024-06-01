import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import VehicleViolationsByLicense from '@/app/Forms/vehicleViolationsByLicense';
import '../../../styles.css';
import FieldSubmit from "@/app/Components/fieldSubmit";
import { Link, useNavigate } from "react-router-dom";
import { ILoginData } from "@/app/dto/ILoginData";
import { IRegisterData } from "@/app/dto/IRegisterData";
import { IdentityService } from "@/app/services/IdentityService";
import LoginForm from "@/app/routes/Identity/loginForm";
import RegisterForm from "@/app/routes/Identity/registerForm";
import VehicleList from '../Forms/VehicleList';
import {JwtContext} from "@/app/routes/JwtContext";


const Sidebar: React.FC = () => {
    const [show, setShow] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [submittedPlate, setSubmittedPlate] = useState('');
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();


    const [loginValues, setLoginValues] = useState<ILoginData>({
        email: "",
        password: "",
    });

    const [registerValues, setRegisterValues] = useState<IRegisterData>({
        email: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const identityService = new IdentityService('/api/v1/identity/Account/');

    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseRegistration = () => {
        setShowRegistrationForm(false);
    };
    const handleShowRegistration = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const handleCloseLogin = () => {
        setShowLoginForm(false);
    };
    const handleShowLogin = () => {
        setShowLoginForm(!showLoginForm);
    };


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

            if (setJwtResponse) {
                setJwtResponse(jwtData);
            }
            navigate("/");
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

            navigate("/login");
            handleClose();
        } catch (error) {
            setValidationErrors(["An error occurred during registration. Please try again later."]);
        }
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
                    <Button variant="primary" onClick={handleShowLogin}>
                        Login
                    </Button>
                    {showLoginForm && (
                        <div style={{ display: jwtResponse == null ? '' : 'none' }}>
                            <LoginForm
                                values={loginValues}
                                handleChange={handleLoginChange}
                                onSubmit={handleLoginSubmit}
                                validationErrors={validationErrors}
                            />
                        </div>
                    )}
                    <Button variant="primary" onClick={handleShowRegistration}>
                        Register
                    </Button>
                    {showRegistrationForm && (
                        <div style={{ display: jwtResponse == null ? '' : 'none' }}>
                            <RegisterForm
                                values={registerValues}
                                handleChange={handleRegisterChange}
                                onSubmit={handleRegisterSubmit}
                                validationErrors={validationErrors}
                            />
                        </div>
                    )}
                    <div style={{ display: jwtResponse == null ? 'none' : '' }}>
                        <Link to="logout" onClick={() => setJwtResponse!}>Log out</Link>
                    </div>
                    <FieldSubmit
                        licensePlate={licensePlate}
                        setLicensePlate={setLicensePlate}
                        onSubmit={handleSubmit}
                    />
                    {submittedPlate && (
                        <VehicleList licensePlate={submittedPlate} />
                    )}
                    
                    {submittedPlate && (
                        <VehicleViolationsByLicense licensePlate={submittedPlate} />
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Sidebar;
