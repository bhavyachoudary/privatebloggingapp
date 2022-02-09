import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getAllblogs, getSearch } from '../../config/Myservices';
import './Dashboard.css';
import jwt_decode from 'jwt-decode';
// import searchReducer from '../../Redux/Reducer/SearchReducer'
import { getProductsByFilter } from '../../Redux/Actions/SearchActions';

import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
    const [blogData, setBlogData] = useState([]);
    const [filterdata, setFilterdata] = useState([]);
    //  const [data, setData] = useState('')
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);

    const handleSearch = e => {
        resetState()
        setText(e.target.value);
        console.log(text)
        dispatch(getProductsByFilter({ type: 'text', query: e.target.value }));
    }

    const resetState = () => {
        setText('');
    };

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
        // }

    }, [products])


    return (
        <>
            <div>
                <img src="/images/blogs3.jpg" className="w-100 img img-fluid" />
                <div className="bgcontain  pt-3">

                    <Container fluid className="pt-3 pb-3   text-center">
                        <h1 className="blog display-6 justify-content">Blogs</h1>

                        <Row>
                            <Col lg={8}>
                                {/* <h1 className="blog display-6 justify-content">Blogs</h1> */}
                            </Col>
                            <Col log={4}>
                                <div className="d-flex justify-content-center">
                                    <input
                                        className='form-control mb-2  w-100 search'
                                        type='search'
                                        placeholder='Search Blogs Here'
                                        aria-label='Search'
                                        name='search'
                                        value={text}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </Col>

                        </Row>
                        <p className="blogDes pt-3">Blogs are a type of website. The only real difference between a blog
                            and other types of website is that blogs <br /> are updated on a regular
                            basis with new content, which is displayed in reverse chronological order.</p>

                        <Container className="pt-3">
                            {text != '' ?
                                <Row>
                                    {
                                        products.map((item, i) =>
                                            <Col lg={6} key={item._id}>
                                                <Card className="m-3 shad heigh">
                                                    <div className="text-center" >
                                                        <img src={`/images/${item.myImage}`} className="pic" />
                                                    </div>
                                                    <Card.Body>
                                                        {/* <span className="postDate">{item.date.substring(0, 10)}</span>  */}
                                                        <Card.Title><span className="postTitle">{item.title}</span></Card.Title>
                                                        <div dangerouslySetInnerHTML={{ __html: item.des }} >

                                                        </div>
                                                        <Card.Text className="des">{item.tags}</Card.Text>
                                                    </Card.Body>

                                                </Card>
                                            </Col>
                                        )
                                    }

                                </Row>
                                :
                                <Row>
                                    {
                                        blogData.map((item, i) =>
                                            <Col lg={6} key={item._id}>
                                                <Card className="m-3 shad heigh">
                                                    <div className="text-center" >
                                                        <img src={`/images/${item.myImage}`} className="pic" />
                                                    </div>
                                                    <Card.Body>
                                                        <Card.Title><span className="postTitle">{item.title}</span></Card.Title>
                                                        <div dangerouslySetInnerHTML={{ __html: item.des }} >
                                                        </div>
                                                        <Card.Text className="des">{item.tags}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            }
                        </Container>
                    </Container >
                </div>
            </div>
        </>

    )
}
