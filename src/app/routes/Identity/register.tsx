import React, { useContext, useState } from "react";
import { MouseEvent } from "react";
import { IRegisterData } from "../../dto/IRegisterData";
import { IdentityService } from "../../services/IdentityService";
import {JwtContext} from "@/app/routes/JwtContext";
import RegisterForm from "@/app/routes/Identity/registerForm";


const Register = () => {
    const [values, setInput] = useState({
        email: "",
        password: "",

    } as IRegisterData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement ) => {

        setInput({ ...values, [target.name]: target.value });
    }

    const jwtContext = useContext(JwtContext);

    const identityService = new IdentityService('');

    const onSubmit = async (event: MouseEvent) => {
        event.preventDefault();

        if (values.password.length === 0 || values.email.length === 0) {
            setValidationErrors(["Bad input values!"]);
            return;
        }

        setValidationErrors([]);

        var jwtData = await identityService.register(values);

        if (jwtData === undefined) {
            setValidationErrors(["No JWT!"]);
            return;
        }

        console.log(jwtData);


        if (jwtContext?.setJwtResponse) {
            jwtContext.setJwtResponse(jwtData);
        }

    }

}

export default Register;