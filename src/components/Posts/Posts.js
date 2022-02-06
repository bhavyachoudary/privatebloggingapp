import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, FloatingLabel, FormLabel } from "react-bootstrap";
import { getBlogdata, editedBlog } from '../../config/Myservices';
import { useNavigate } from "react-router";
import './Posts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Posts() {
    const [blogData, setBlogData] = useState([]);
    const [show, setShow] = useState(true);
    const [showadd, setShowadd] = useState(false);
    const [status, setStatus] = useState(false);
    const [blogid, setBlogid] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const navigate = useNavigate();
    const [errors, setError] = useState({
        err_title: '', des: ''
    })
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

    useEffect(() => {
        getBlogdata(sessionStorage.getItem('user'))
            .then(res => {
                console.log(res.data)
                console.log(res.data.blogdata)
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {

                    setBlogData(res.data.blogdata);
                }

            })

    }, [])

    const editBlog = (event, id, data) => {
        event.preventDefault();
        console.log(data)
        console.log("edit  blog clicked")
        setBlogid(id)
        setTitle(data.title)
        setDes(data.des)
        setShowadd(true);
        console.log(showadd)
    }

    const updatedBlog = (event, id) => {
        event.preventDefault();
        let update = true;
        console.log("Add edited blog")
        //let email = sessionStorage.getItem('user')
        let data = { title: title, des: des, update: update }
        console.log(data)
        editedBlog(blogid, data)
            .then((res) => {
                console.log(res.data)
                if (res.data.err) {
                    failure(res.data.err)
                }
                else {
                    success(res.data.msg)
                    setStatus(true)
                }
            })

        setShowadd(false)
        window.location.reload(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const singleitem = (id) => {
        console.log(id)
        navigate(
            '/preview',
            {
                state: { id: id }
            }
        )
    }

    return (

        <Container fluid className="pt-3 pb-3  bgcontain">
            <Row>
                {blogData.map((item, i) =>
                (
                    <Container className="d-flex justify-content-center">
                        <Col lg={10} key={item._id}>

                            <Card className="m-3 shad  p-3">
                                <Row>
                                    <Col lg={4}>
                                        <img src={`/images/${item.blogProfile}`} height="200px" width="260px" className="blogs" />
                                    </Col>
                                    <Col lg={8}>

                                        <Card.Body>
                                            <Card.Title className="title">{item.title}</Card.Title>
                                            <div dangerouslySetInnerHTML={{ __html: item.des }} >

                                            </div>
                                            {/* <Card.Text  className="des">{item.des}</Card.Text> */}
                                        </Card.Body>

                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="button btn btn-warning mr-2 " data-bs-toggle="modal" data-bs-target="#myModal" onClick={(e) => editBlog(e, item._id, item)} >Edit</button>
                                            {/* <Button variant="warning" className="button mr-2" onClick={handleShow}>Edit</Button>  */}
                                            <Button variant="primary" className="button" onClick={() => singleitem(item._id)}>Preview</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {showadd ? (
                            <Modal show={showadd} add onHide={handleClose} >
                                <Modal.Header closeButton>
                                    <Modal.Title >Edit Your Blog </Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form >

                                        <Form.Group className="mb-3" >
                                            <Form.Label><b>Title:</b></Form.Label>
                                            <Form.Control type="text" name="title" placeholder='Enter Title' value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" />
                                            <span style={{ color: 'red' }}>{errors.err_title}</span>
                                        </Form.Group>

                                        <FloatingLabel className="mb-3">
                                            <Form.Label><b>Body:</b></Form.Label>
                                            <Form.Control as="textarea" placeholder="Enter Description" name="des" id="des" value={des} onChange={(e) => { setDes(e.target.value) }} />

                                            <span style={{ color: 'red' }}>{errors.err_des}</span>
                                        </FloatingLabel>

                                        <div style={{ textAlign: "center" }}>
                                            <Button variant="warning" onClick={handleClose} > Close </Button>
                                            <Button variant="primary" type="submit" onClick={(event) => updatedBlog(event, item._id)} >Update</Button>
                                        </div>
                                    </Form>

                                </Modal.Body>

                            </Modal>
                        ) : ''}
                    </Container>
                )

                )}

            </Row>
        </Container>

    )
}
