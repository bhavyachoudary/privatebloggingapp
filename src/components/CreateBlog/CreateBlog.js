import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';
import { Container, Nav, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createBlog, getProfile } from '../../config/Myservices';
import './CreateBlog.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function CreateBlog() {
    let [info, setInfo] = useState({ title: '' });
    let editorState = EditorState.createEmpty();
    let [des, setDes] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDes(editorState)
    }
    console.log(info)
    console.log(des)

    const handleChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value })


    }
    // const ref = React.createRef();
    let [userimage, setUserImage] = useState('')
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    const addBlog = () => {
        let email = sessionStorage.getItem('user')
        let data = { title: info.title, des: info.des.value, email: email };
        console.log(data)
        createBlog(data)
            .then(res => {
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    navigate('/myposts')
                }

                const formData = new FormData();
                formData.append('file', document.getElementById('files').files[0]);
                formData.append('email', sessionStorage.getItem('user'))
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                axios.post("http://localhost:9999/api/blog/upload", formData, config)
                    .then((res) => {
                        console.log(res.data)
                        console.log(res.data.image)
                        setUserImage(res.data.image)
                        success("The file is successfully uploaded");

                    })
                window.location.reload()
            });

    }

    return (
        <Container fluid className="d-flex justify-content-center p-3  bgcontainer">

            <Col lg={5} md={4} sm={12} xs={12}>
                <Container className="w-100 bgcard p-3 shad">
                    <h2 className="pb-2 text-center"> Add Blogs Here</h2>
                    <Form >
                        <div style={{ textAlign: 'center' }} className="settingsPP" >
                            <img src={`/images/${userimage}`} className="pic" />
                            <label htmlFor="files"> <i className="settingsPPIcon"><FaCamera /></i> </label>
                            <input type="file" id="files" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} name="myImage" className="pl-5 mb-2" />

                        </div>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label ><b>Title:</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" id="title" name="title" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Editor
                                editorState={des}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                editorStyle={{ border: '2px solid white' }}

                            />

                            <textarea style={{ display: "none" }} disabled
                                ref={(val) => (info.des = val)} value={draftToHtml(
                                    convertToRaw(
                                        des.getCurrentContent()
                                    )
                                )} />
                        </Form.Group>
                        {/* <FloatingLabel className="mb-3">
                        <Form.Label><b>Body:</b></Form.Label>
                            <Form.Control as="textarea" rows="6" cols="40" placeholder="Enter Description" value={des} name="des" id="des" onChange={(e) => { setDes(e.target.value) }} />
                    </FloatingLabel> */}

                        <Button variant="success" className="btn-block" onClick={addBlog} >ADD Blog</Button>

                    </Form>
                </Container>
            </Col>

        </Container>

    )
}
