import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, FloatingLabel, FormLabel } from "react-bootstrap";
import { getBlogdata, editedBlog } from '../../config/Myservices';
import { useNavigate } from "react-router";
import './Posts.css';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState, convertFromHTML, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertFromHTML } from 'draft-convert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Posts() {
    const [blogData, setBlogData] = useState([]);
    const [show, setShow] = useState(true);
    const [showadd, setShowadd] = useState(false);
    const [status, setStatus] = useState(false);
    const [blogid, setBlogid] = useState('');
    const [title, setTitle] = useState('');
    let [des, setDes] = useState('');
    const [tags, setTags] = useState('')
    const [details, setDetails] = useState('');
    const navigate = useNavigate();

    const onEditorStateChange = (editorState) => {
        setDes(editorState)
    }

    // let editorState = EditorState.createWithContent(
    //     ContentState.createFromBlockArray(
    //         convertFromHTML(details)
    //         // `${details.description}`)
    //         //     details.description !== undefined
    //         //         ? `${details.description}`
    //         //         : " <p>Hello All SS</p>"
    //         // )
    //     )
    // );
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
        setTags(data.tags)
        // setDetails(data.des)
        setShowadd(true);
        console.log(showadd)
    }

    const updatedBlog = (event, id) => {
        event.preventDefault();
        let update = true;
        console.log("Add edited blog")
        //let email = sessionStorage.getItem('user')
        let data = { title: title, des: des, tags: tags, update: update }
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

    const handleClose = () => setShowadd(false);

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
        <div>
            <img src="/images/b3.jpg" className="w-100 img img-fluid" />
            <Container fluid className="pt-3 pb-3  bgcontain">
                {blogData.length !== 0 ?
                    <Row>
                        {blogData.map((item, i) =>
                        (
                            <Container className="d-flex justify-content-center">
                                <Col lg={10} key={item._id}>

                                    <Card className="m-3 shad  p-3">
                                        <Row>
                                            <Col lg={4}>
                                                <img src={`/images/${item.myImage}`} width="260px" className="blogs img" />
                                            </Col>
                                            <Col lg={8}>

                                                <Card.Body>
                                                    <Card.Title className="title">{item.title}</Card.Title>
                                                    <div dangerouslySetInnerHTML={{ __html: item.des }} >
                                                    </div>
                                                    <a href="https://www.bing.com/images/search?q=travelling&qpvt=travelling&tsc=ImageHoverTitle&form=IGRE&first=1" target="_blank" className="des">{item.tags} </a>
                                                </Card.Body>

                                                <div className="d-flex justify-content-end mr-5">
                                                    <button type="button" className="button btn btn-warning mr-2 " data-bs-toggle="modal" data-bs-target="#myModal" onClick={(e) => editBlog(e, item._id, item)} >Edit</button>
                                                    {/* <Button variant="warning" className="button mr-2" onClick={handleShow}>Edit</Button>  */}
                                                    <Button variant="dark" className="button" onClick={() => singleitem(item._id)}>Veiw</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>

                                {showadd ? (
                                    <Modal show={showadd} onHide={handleClose} >
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
                                                {/* <Editor
                                                    editorState={des}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                    editorStyle={{ border: '1px solid white', height: '200px' }}
                                                />
                                                <textarea
                                                    style={{ display: "none" }}
                                                    disabled
                                                    onChange={(e) => {
                                                        setDes(e.target.value);
                                                    }}
                                                    ref={(val) => (des = val)}
                                                    value={draftToHtml(
                                                        convertToRaw(
                                                            des.getCurrentContent()
                                                        )
                                                    )}
                                                /> */}

                                                <FloatingLabel className="mb-3">
                                                    <Form.Label><b>Body:</b></Form.Label>
                                                    <Form.Control as="textarea" cols="20" rows="5" placeholder="Enter Description" name="des" id="des" value={des} onChange={(e) => { setDes(e.target.value) }} />
                                                    {/* <span style={{ color: 'red' }}>{errors.err_des}</span> */}
                                                </FloatingLabel>
                                                <Form.Group className="mb-3 mt-3">
                                                    <Form.Label ><b>Tags: </b></Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Tags Name" id="tags" name="tags" value={tags} onChange={(e) => { setTags(e.target.value) }} required />
                                                    {tags != '' && tags.length < 4 && <span className="text-danger">Enter unique tags*</span>}
                                                </Form.Group>
                                                <div style={{ textAlign: "center" }}>
                                                    <Button variant="success" type="submit" onClick={(event) => updatedBlog(event, item._id)} >Save</Button>
                                                    <Button variant="dark" className="ml-5" onClick={() => singleitem(blogid)} > Preview </Button>
                                                </div>
                                            </Form>

                                        </Modal.Body>

                                    </Modal>
                                ) : ''}
                            </Container>
                        )

                        )}

                    </Row>
                    :
                    <div className="text-center">
                        <h2 classNAme="tect-danger">No Posts Found</h2>

                    </div>
                }
            </Container>
        </div >

    )
}
