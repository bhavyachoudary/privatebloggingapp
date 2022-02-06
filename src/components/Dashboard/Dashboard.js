import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getAllblogs } from '../../config/Myservices';
import './Dashboard.css';
export default function Dashboard() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        getAllblogs()
            .then(res => {
                console.log(res.data)
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {
                    setBlogData(res.data.blogdata);
                }

            })

    }, [])


    return (
        <>
            <Container fluid className="pt-5 pb-5 bgcontain text-center">
                <h2 className="text-warning">Blogs</h2>
                <p className="blogDes">Blogs are a type of website. The only real difference between a blog
                    and other types of website is that blogs <br /> are updated on a regular
                    basis with new content, which is displayed in reverse chronological order.</p>
           
            <Container className="pt-3">
                <Row>
                    {blogData.map((item, i) =>
                        <Col lg={4} key={item._id}>
                            <Card className="m-3 shad ">
                                <div className="text-center" >
                                    <img src={`/images/${item.blogProfile}`} className="pic" />
                                </div>
                                <Card.Body>

                                    {/* <span className="postDate">{item.date.substring(0, 10)}</span>  */}

                                    <Card.Title><span className="postTitle">{item.title}</span></Card.Title>
                                    <Card.Text><span className="postDes">{item.des}</span> </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            </Container >

        </>

    )
}
