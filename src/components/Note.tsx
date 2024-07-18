import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
import { message, Popconfirm } from "antd";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Popconfirm
              title="Delete the Notes"
              description="Are you sure to delete this Notes?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                onDelete(note.id);
                message.open({
                  type: "success",
                  content: "Deleted Successfully",
                });
                navigate("/");
              }}
            >
              <Button variant="outline-danger">Delete</Button>
            </Popconfirm>

            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
