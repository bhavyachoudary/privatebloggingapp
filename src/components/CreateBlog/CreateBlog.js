import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';
import { Container, Nav, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createBlog, getProfile, authentication } from '../../config/Myservices';
import './CreateBlog.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function CreateBlog() {
    let [info, setInfo] = useState({ title: '', tags: '' });
    let editorState = EditorState.createEmpty();
    let [des, setDes] = useState(editorState);
    let [image, setImage] = useState('');
    const navigate = useNavigate();

    const onEditorStateChange = (editorState) => {
        setDes(editorState)
    }
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });


    const handleChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value })

    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setInfo({ ...info, myImage: event.target.files[0] });
            setImage(URL.createObjectURL(event.target.files[0]));
        }

    }
    const url = image ? image : "./images/b2.jpg";

    useEffect(() => {
        if (sessionStorage.getItem('_token') != undefined) {
            authentication(sessionStorage.getItem("_token")).then(res => {
                if (res.data.msg) {
                    console.log(res.data)
                    success(res.data.msg)
                }
            })
        }
        else {
            warning('Login is Required');
            navigate('/login')
        }

    }, [])

    const addBlog = (e) => {

        e.preventDefault()
        let email = sessionStorage.getItem('user')
        let formData = new FormData();
        formData.append('myImage', info.myImage)
        formData.append('title', info.title)
        formData.append('des', info.des.value)
        formData.append('tags', info.tags)
        formData.append('email', email)
        console.log(formData)
        createBlog(formData)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    navigate('/myposts')
                }
            })
    }

    return (
        <Container fluid className="d-flex justify-content-center p-3  bgcontainer">

            <Col lg={5} md={4} sm={12} xs={12}>
                <Container className="w-100 bgcard p-3 shad">
                    <h2 className="pb-2 text-center"> Add Blogs Here</h2>

                    <Form encType='multipart/form-data'>
                        <div style={{ textAlign: 'center' }} >
                            <img src={url} alt="preview" className="pic" />
                            <label htmlFor="files"> <i className="settingsPPIcon"><FaCamera /></i> </label>
                            <input type="file" id="files" style={{ display: "none" }} onChange={onImageChange} name="myImage" className="pl-5 mb-2 filetype" />
                        </div>

                        <Form.Group className="mb-3 mt-3">
                            <Form.Label ><b>Title: </b></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" id="title" name="title" onChange={handleChange} required />
                            {info.title != '' && info.title.length < 4 && <span className="text-danger">Title should be atleast 3 characters is Required *</span>}
                        </Form.Group>
                        <Form.Group>

                            <Editor
                                editorState={des}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                editorStyle={{ border: '1px solid white', height: '200px' }}
                            />

                            <textarea style={{ display: "none" }} disabled
                                ref={(val) => (info.des = val)} value={draftToHtml(
                                    convertToRaw(
                                        des.getCurrentContent()
                                    )
                                )} />

                            {des != '' && des.length < 10 && <span className="text-danger">Description Feild is Required *</span>}

                        </Form.Group>

                        <Form.Group className="mb-3 mt-3">
                            <Form.Label ><b>Tags: </b></Form.Label>
                            <Form.Control type="text" placeholder="Enter Tags Name" id="tags" name="tags" onChange={handleChange} required />
                            {info.tags != '' && info.tags.length < 4 && <span className="text-danger">Enter unique tags*</span>}
                        </Form.Group>
                        {/* <FloatingLabel className="mb-3">
                        <Form.Label><b>Body:</b></Form.Label>
                            <Form.Control as="textarea" rows="6" cols="40" placeholder="Enter Description" value={des} name="des" id="des" onChange={(e) => { setDes(e.target.value) }} />
                    </FloatingLabel> */}

                        <Button variant="success" className="btn-block" onClick={addBlog} >ADD Blog</Button>

                    </Form>
                </Container>
            </Col >

        </Container >

    )
}
