import React, { useState, useEffect } from "react";
import {
    Container,
    Nav,
    Form,
    Row,
    Col,
    Button,
    FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { loginUser, socialloggin } from "../../config/Myservices";
import * as Icon from "react-bootstrap-icons";
import SocialButton from "../../components/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    const success = (data) =>
        toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) =>
        toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) =>
        toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        if (sessionStorage.getItem("_token") != undefined) {
            sessionStorage.removeItem("_token");
        }
    }, []);

    const login = (event) => {
        event.preventDefault();
        let data = { email: email, password: password };
        loginUser(data).then((res) => {
            if (res.data.err) {
                console.log(res.data);
                failure(res.data.err);
            } else {
                success(res.data.msg);
                console.log(res.data);
                console.log(email);
                sessionStorage.setItem("user", email);
                sessionStorage.setItem("_token", res.data.token);
                navigate("/");
            }
        });
    };
    const handleSocialLogin = (user) => {
        console.log(user);
        let email = user._profile.email;
        let data = {
            name: user._profile.firstName,
            lname: user._profile.lastName,
            email: email,
        };
        socialloggin(data).then((res) => {
            if (res.data.err) {
                console.log(res.data);
                failure(res.data.err);
            } else {
                console.log(res.data);
                success(res.data.msg);
                navigate("/");
                sessionStorage.setItem("_token", res.data.token);
                sessionStorage.setItem("user", email);
                setTimeout(() => {
                    window.location.reload(false);
                }, 3000);
            }
        });
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    return (
        <>
            <Container className="d-flex justify-content-center ">
                <Container className="conatiner mt-3 mb-3 shad">
                    <Row>
                        <Col md={6} lg={6} sm={12} xs={12}>
                            <img src="./images/3.png" className="w-100" />
                        </Col>

                        <Col md={6} lg={6} sm={12} xs={12}>
                            <Form className="p-5 bg-light" onSubmit={login}>
                                <h2 className="text-center">Login Page</h2>
                                <Container className="p-3">
                                    <Form.Group className="mb-3">
                                       
                                            <FormLabel>Name:</FormLabel>
                                     

                                    
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Email"
                                                name="email"
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            {email != "" && !regForEmail.test(email) && (
                                                <span className="text-danger">
                                                    Enter email correctly
                                                </span>
                                            )}
                                      
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                       
                                            <FormLabel>Password:</FormLabel>
                                       

                                        
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                            {password != "" && password.length < 8 && (
                                                <span className="text-danger">
                                                    Enter password correctly
                                                </span>
                                            )}
                                      
                                    </Form.Group>

                                    <Button variant="success" className="btn-block" type="submit">
                                        Login
                                    </Button>

                                    <div class="text-center mt-4">
                                        {/* <Button variant="secondary" type="submit" href="/register" className="ml-2" >Register Now</Button> */}
                                        <a href="/forgotpassword" className="ml-2">
                                            Forgot Password
                                        </a>
                                    </div>
                                   
                                        <h6 className='text-dark text-center pt-3'>OR SignUp with Social Login</h6>
                                    
                                        <div className="d-flex justify-content-center">
                                        <SocialButton
                                            className="btn btn-danger p-2 mb-3 mt-2 mr-2"
                                            provider="google"
                                            appId="541294076156-665cub3gp8l3lvnhhtcp6eqtv6mrb080.apps.googleusercontent.com"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                        >
                                            <i className="mr-3">
                                                <Icon.Google size={25} />
                                            </i>
                                        </SocialButton>

                                        <SocialButton
                                            className="btn btn-primary  p-2 mb-3 mt-2"
                                            provider="facebook"
                                            appId="564806257914027"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                        >
                                            <i className="mr-3">
                                                <Icon.Facebook size={25} />
                                            </i>
                                        </SocialButton>
                                        
                                    </div>
                                </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}
