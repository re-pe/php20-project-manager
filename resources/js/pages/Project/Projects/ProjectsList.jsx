import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Button, Accordion, Card } from 'react-bootstrap';
import Moment from "moment";
import { useHistory } from 'react-router-dom';

const Projects = () => {
    const history = useHistory();
    const [projectsData, setProjectsData] = useState([]);
    const [idDelete, setIdDelete] = useState(0);
    useEffect(async () => {
        const config = {
            method: "GET",
            url: "/api/projects",
            headers: {
                Accept: "application/json",
            },
        };
        await axios(config)
            .then((response) => {
                // console.log(response.data);
                setProjectsData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [idDelete]);
    console.log(projectsData);

    const deleteProject = useCallback(
        async (deleteId) => {
            const config = {
                _method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            };
            await axios
                .post(`/api/projects/${deleteId}`, config)
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        []
    );

    // console.log();
    return (
        <Container>
            <div>
                <Button
                    className="mb-3"
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Back
                    </Button>
            </div>
            <Accordion>
                {projectsData.map(project => (
                    <Card key={project.id} id={project.id}>
                        <Accordion.Toggle
                            className="text-capitalize"
                            as={Button}
                            variant="link"
                            eventKey={project.id}
                        >
                            <Card.Header as="h4">
                                {project.name}
                            </Card.Header>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey={project.id}>
                            <Card.Body className="bg-white">
                                <Card.Title className="text-capitalize">
                                    State: {project.state.name}
                                </Card.Title>

                                <Card.Title className="text-capitalize">
                                    Tasks assigned: {project.tasks_count}
                                </Card.Title>
                                <Card.Title className="text-capitalize">
                                    Unfinished tasks: {project.unfinished_tasks_count}
                                </Card.Title>

                                <Card.Text>{project.description}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Button
                                            className="mr-1"
                                            type="submit"
                                            value={project.id}
                                            onClick={() => {
                                                history.push(`/task/${project.id}`);
                                            }}
                                        >
                                            View tasks
                                        </Button>
                                        <Button className="mr-1">Show Board</Button>
                                        <Button className="mr-1">Edit</Button>
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            value={project.id}
                                            onClick={() => {
                                                if (confirm("Are you sure want to delete project?")) {
                                                    deleteProject(project.id);
                                                    setIdDelete(project.id);
                                                } else {
                                                    setIdDelete(project.id);
                                                    return false;
                                                }

                                            }
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                    <div>
                                        <Card.Text>
                                            Created date: {Moment(project.created_at).format("YYYY-MM-DD HH:mm:ss")}
                                        </Card.Text>
                                        <Card.Text>
                                            Updated date: {Moment(project.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </Container>

    );
};
export default Projects;
