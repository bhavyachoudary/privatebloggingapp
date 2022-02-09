import React from 'react'
import { Navbar, Container, Nav, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { BsCartFill } from "react-icons/bs";
import { BiUserCircle, BiLogInCircle } from 'react-icons/bi';
import { FaUserEdit, FaRegistered } from "react-icons/fa";
import { HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import './Headers.css';


function Headers() {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('user')
        navigate('/login')
        window.location.reload(false)
    }

    return (
        <div>
            <Navbar expand="lg" className="head">
                <Container>
                    <Navbar.Brand href="/"><h2 className="text-light">Blog<span className="text-danger" >Book</span></h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarscroll" />
                    <Navbar.Collapse id="navbarscroll">
                        <Container className="d-flex justify-content-center" style={{ maxHeight: '100px', fontSize: "17px" }}>
                            <Nav.Link href="/" className="navcolor">Home</Nav.Link>

                            {sessionStorage.getItem('user') ?
                                <>
                                    <Nav.Link href="/myposts" className="navcolor">MyPosts</Nav.Link>

                                </> : ''}
                            <Nav.Link href="/createblog" className="navcolor">CreateBlog</Nav.Link>
                        </Container>


                        <DropdownButton variant="light" title={<FaUserEdit size={22} />}>
                            {sessionStorage.getItem('_token') == undefined ? <>

                                <Dropdown.Item href="/login"><BiLogInCircle size={20} color='#88E0EF' /> Login</Dropdown.Item>
                                <Dropdown.Item href="/register"><FaRegistered size={20} color='#88E0EF' /> Register</Dropdown.Item>

                            </> :
                                <>
                                    <Dropdown.Item href="/profile"><BiUserCircle size={25} color='#D77FA1' /> Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}><HiLogout size={20} color='#D77FA1' /> Logout</Dropdown.Item>
                                </>}

                        </DropdownButton>


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Headers
