import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getProfile, updProfile } from "../../config/Myservices";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Profile() {
    let [user, setUser] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
    let [name, setName] = useState("");
    let [lname, setLname] = useState("");
    let [email, setEmail] = useState("");
    const navigate = useNavigate();
    const success = (data) =>
        toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) =>
        toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) =>
        toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        getProfile(sessionStorage.getItem("user")).then((res) => {
            if (res.data.user) {
                console.log(res.data.user);
                let data = res.data.user;
                setUser(data);
                setEmail(data.email);
                setName(data.name);
            }
        });
    }, []);


    const updateProfile = (id) => {
        let data = {
            name: name,
            lname: lname,
            email: email,
        };
        console.log(data);
        updProfile(id, data).then((res) => {
            if (res.data.err) {
                failure(res.data.err);
            } else {
                success(res.data.msg);
                window.location.reload();
            }
        });
    };

    return (
        <Container fluid className="bg-contain">
            <Container className="pt-3 pb-3  ">
                <Row>
                    {!showInvoice && (
                        <Container className="shad col-lg-6 p-5" >

                            <div className="settingsPP">
                                <div>
                                    <img
                                        src={`/images/${user.imagePath}`}
                                        className="img"
                                    />
                                    {/* <h4 className="text-danger">{user.name}</h4> */}
                                </div>
                            </div>
                            <Card.Body style={{ fontSize: "20px", fontWeight: "bold" }}>
                                <Card.Text>
                                    FirstName:&nbsp; <span>{user.name} </span>
                                </Card.Text>
                                <Card.Text>
                                    {" "}
                                    <span>LastName:&nbsp;{user.lname} </span>{" "}
                                </Card.Text>
                                <Card.Text>
                                    <span> Email:&nbsp;{user.email}</span>
                                </Card.Text>

                                <hr />
                                <Button
                                    variant="dark"
                                    onClick={() => setShowInvoice(true)}
                                >
                                    Edit profile
                                </Button>
                            </Card.Body>

                        </Container>
                    )}
                    {showInvoice && (
                        <Container className="m-1">
                            <Container className="col-lg-6 shad p-5">
                                <h2 className="text-center pt-3 p-3">Update Profile </h2>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>First Name</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                name="lname"
                                                defaultValue={user.name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                            {name != "" && name.length < 4 && (
                                                <span className="text-danger">
                                                    Enter Name correctly
                                                </span>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>Last Name</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                name="fname"
                                                defaultValue={user.lname}
                                                onChange={(e) => {
                                                    setLname(e.target.value);
                                                }}
                                            />
                                            {lname != "" && lname.length < 4 && (
                                                <span className="text-danger">
                                                    Enter Name correctly
                                                </span>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>Email</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Email"
                                                name="email"
                                                defaultValue={user.email}
                                                readOnly
                                            />
                                            {email != "" && !regForEmail.test(email) && (
                                                <span className="text-danger">
                                                    Enter email correctly
                                                </span>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Button
                                        variant="info"
                                        onClick={() => updateProfile(user._id)}
                                        className="mt-3"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => setShowInvoice(false)}
                                        className="mt-3 ml-3"
                                    >
                                        Close
                                    </Button>
                                </Form>
                            </Container>

                        </Container>
                    )}

                </Row>
            </Container>
        </Container>
    );
}
