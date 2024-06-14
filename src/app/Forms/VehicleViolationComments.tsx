import React, { useEffect , useState} from "react";
import type { IComment } from "../types/IEvidences";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { CommentService } from '../services/CommentService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";



interface VehicleViolationCommentsByIdProps {
    id: string;
}

const VehicleViolationComments: React.FC<VehicleViolationCommentsByIdProps> = ({ id }) => {
    const CommentEndpoint = 'Comment/GetAllCommentsWithParentCommentId';
    const commentService = new CommentService(CommentEndpoint);
    const [comments, setComments] = useState<IComment []| null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedComments: IComment[]  = await  commentService.getAllById(id);
                setComments(fetchedComments)
            }
                catch (error) {
                    console.error("Error fetching vehicle violations:", error);
                }
            };
    
            fetchData();
        }, []);

        if (comments === null)
            {
              return <div><Spinner animation="border" /></div>;
            }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>subcomments</th>

          </tr>
        </thead>
        <tbody>
                    {comments.map((comment: IComment) => (
                        <tr key={comment.id}>
                            <td>{comment.commentText}</td>
                        </tr>
                    ))}
                </tbody>

      </Table>
      
    </div>
  );
};

export default VehicleViolationComments;
