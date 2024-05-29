import React from 'react';
import { IRegisterData } from "@/app/dto/IRegisterData";

interface RegisterFormProps {
    values: IRegisterData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    validationErrors: string[];
}

const RegisterForm: React.FC<RegisterFormProps> = ({ values, handleChange, onSubmit, validationErrors }) => {
    return (
        <form>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={values.email} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={values.password} onChange={handleChange} />
            </div>

            {validationErrors.length > 0 && (
                <ul>
                    {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <button onClick={onSubmit}>Register</button>
        </form>
    );
};

export default RegisterForm;
