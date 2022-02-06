import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { registerUser, socialloggin } from '../../config/Myservices';
import { useNavigate } from 'react-router';
import * as Icon from 'react-bootstrap-icons';
import './Register.module.css';
import { getProfile } from '../../config/Myservices';
import SocialButton from '../../components/SocialLogin';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Registration() {
    let [name, setName] = useState('');
    let [lname, setLname] = useState('');
    let [image, setImage] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmpassword, setConfirmpassword] = useState('');


    const navigate = useNavigate();


    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    const register = () => {
        const formData = new FormData();
        formData.append('file', document.getElementById('files').files[0]);
        formData.append('email', email)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let data = { name: name, lname: lname, email: email, password: password, confirmpassword: confirmpassword,image:image };
        console.log(data)
        registerUser(data, formData, config)
            .then(res => {
                if (res.data.err) {
                    console.log(res.data)
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    console.log(res.data)
                    navigate('/login')
                }
            });

       
        // axios.post("http://localhost:9999/api/blog/upload", formData, config)
        //     .then((res) => {
        //         console.log(res.data)
        //         //success("The file is successfully uploaded");

        //     })

    }

    const handleSocialLogin = (user) => {
        console.log(user);
        let email = user._profile.email
        let data = {
            name: user._profile.firstName,
            lname: user._profile.lastName,
            email: email,

        };
        socialloggin(data).then((res) => {
            if (res.data.err) {
                console.log(res.data)
                failure(res.data.err);
            } else {
                console.log(res.data)
                success(res.data.msg);
                navigate("/login");
                sessionStorage.setItem("_token", res.data.token);
                sessionStorage.setItem("user", email);
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
                    {/* <h1 className="text-center text-dark pb-3">Register</h1> */}
                    <Row>
                        <Col md={6} lg={6} sm={12} xs={12} className="pt-5">
                            <img src="./images/sign.png" className='pt-5 w-100 heigh' />
                        </Col>

                        <Col md={6} lg={6} sm={12} xs={12} >
                       
                                    <div className="d-flex justify-content-center pt-2">
                                    <h6 className='text-dark text-center pt-3'>SignUp with Social Login</h6>&nbsp;
                                    
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
                                    
                            <Form className="p-4 bg-light" >
                                <div style={{ textAlign: 'center' }} >
                                    <img src={image} height="100px" width="100px" className="pic" />
                                </div>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>FirstName:</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" name="name" id="name" onChange={(event) => { setName(event.target.value) }} required />
                                    {name != '' && name.length < 4 && <span className="text-danger">Enter firstName correctly</span>}
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label><b>LastName:</b></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Last Name" name="lname" id="lname" onChange={(event) => { setLname(event.target.value) }} required />
                                    {name != '' && name.length < 4 && <span className="text-danger">Enter lastName correctly</span>}
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label><b>
                                        Upload:</b></Form.Label>
                                    <Form.Control type="file" placeholder="Choose Image" name="myImage" id="files" onChange={(event) => { setImage(event.target.value) }} required />
                                    {/* {name != ''  && <span className="text-danger">Choose image</span>} */}
                                </Form.Group>
                                {/* <input type="file" id="files" name="myImage" className="ml-5 pl-5 mb-2" /> */}

                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Email:</b></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={(event) => { setEmail(event.target.value) }} required />
                                    {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Pasword:</b></Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={(event) => { setPassword(event.target.value) }} required />
                                    {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Confirm Password:</b></Form.Label>
                                    <Form.Control type="password" placeholder="Enter ConfirmPassword" name="confirmpassword" id="confirmpassword" onChange={(event) => { setConfirmpassword(event.target.value) }} required />
                                    {confirmpassword != '' && confirmpassword != password && <span className="text-danger">Passwords doesn't match</span>}
                                </Form.Group>

                                <Button variant="success" className="btn-block" onClick={register}>Register</Button>
                                {/* <Button variant="warning" type="submit" href="/login" className="ml-3"> Login</Button> */}

                            </Form>
                            
                          
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
