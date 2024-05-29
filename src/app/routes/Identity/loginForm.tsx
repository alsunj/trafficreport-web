import React from "react";
import { ILoginData } from "@/app/dto/ILoginData";

interface LoginFormProps {
    values: ILoginData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    validationErrors: string[];
}

const LoginForm: React.FC<LoginFormProps> = ({ values, handleChange, onSubmit, validationErrors }) => {
    return (
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={onSubmit}>Login</button>
            {validationErrors.length > 0 && (
                <div>
                    {validationErrors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
            )}
        </form>
    );
}

export default LoginForm;