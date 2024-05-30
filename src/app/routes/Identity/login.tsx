import { MouseEvent, useContext, useState } from "react";
import { IdentityService } from "../../services/IdentityService";
import { JwtContext } from "../Root";
import { useNavigate } from "react-router-dom";
import { ILoginData } from "@/app/dto/ILoginData";

import LoginForm from "@/app/routes/Identity/loginForm";

const Login = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState<ILoginData>({
        email: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...values, [event.target.name]: event.target.value });
    }

    const { setJwtResponse } = useContext(JwtContext);

    const identityService = new IdentityService('https://alsunjtrafficreport.azurewebsites.net/api/v1/identity/Account/Login');

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!values.email || !values.password) {
            setValidationErrors(["Please fill in all fields."]);
            return;
        }

        setValidationErrors([]);

        try {
            const jwtData = await identityService.login(values);

            if (!jwtData) {
                setValidationErrors(["Invalid email or password."]);
                return;
            }

            if (setJwtResponse) {
                setJwtResponse(jwtData);
            }
            navigate("/");
        } catch (error) {
            setValidationErrors(["An error occurred during login. Please try again later."]);
        }
    }

    return (
        <LoginForm
            values={values}
            handleChange={handleChange}
            onSubmit={onSubmit}
            validationErrors={validationErrors}
        />
    );
}

export default Login;
