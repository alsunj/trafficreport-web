import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import { CommentService } from "../services/CommentService";
import { IComment } from "../types/IEvidences";
import 'bootstrap/dist/css/bootstrap.min.css';

interface CommentFormProps {
   vehicleViolationid: string;
   ParentCommentid: undefined | string;
   onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
   onCancel: () => void;


}
const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, vehicleViolationid, ParentCommentid, onCancel }) => {
  
  console.log("Comment/post");
  console.log(vehicleViolationid);
  console.log(ParentCommentid);
  const [commentText, setCommentText] = useState<string>("");
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 255) {
      setCommentText(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const endpoint = "Comment/post"
    const commentService = new CommentService(endpoint);
    event.preventDefault();
    const comment: IComment = {
      commentText: commentText,
      parentCommentId: ParentCommentid,
      appUserId:"6a9def19-7a61-4791-8d3a-fa26bd8b8d3b",
      vehicleViolationId: vehicleViolationid,
      createdAt: new Date().toISOString()
    };
    try{
        commentService.add(comment)
        console.log(comment)
    }
    finally{onSubmit(event);}
      
    

  };
  return (
    <Form onSubmit={handleSubmit} className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow" style={{ width: '700px' }}>
      <h4>Add Comment</h4>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Comment Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Comment"
          value={commentText}
          onChange={handleDescriptionChange}
        />
        <Form.Text className="text-muted">
          {commentText.length}/255 characters
        </Form.Text>

        </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Submit Comment</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

      </div>
      
    </Form>
  );
};
//parentcommnt
//accountid
//vehicle violation id

export default CommentForm;
