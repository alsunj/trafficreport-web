import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface FieldSubmitProps {
    licensePlate: string;
    setLicensePlate: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FieldSubmit: React.FC<FieldSubmitProps> = ({ licensePlate, setLicensePlate, onSubmit }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLicensePlate(event.target.value);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Search by License plate</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="123ABC"
                    value={licensePlate}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default FieldSubmit;
