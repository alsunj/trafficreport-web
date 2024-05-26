import React from "react";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CommentFormProps {
   // vehicleViolationid: string;
   // ParentCommentid?: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Add Comment</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Comment Text</Form.Label>
        <Form.Control type="text" placeholder="Enter Comment Text" />
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit Comment</button>
      </div>
      
    </Form>
  );
};
//parentcommnt
//accountid
//vehicle violation id

export default CommentForm;
