import React, { useState, useEffect } from 'react';
import { getSingleBlog } from '../../config/Myservices';
import { useLocation } from "react-router";
import { Container, Tabs, Tab } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function BlogPage() {
  let email = sessionStorage.getItem('user')
  const [postdata, setPostdata] = useState([]);
  const { state } = useLocation();

  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) => toast.warn(data, { position: toast.POSITION.TOP_CENTER });

  useEffect(() => {
    console.log(state.id);
    getSingleBlog(state.id)
      .then((res) => {
        console.log(res.data);
        setPostdata(res.data.singleblog);

      });
  }, []);

  return (
    <Container className="mt-5 mb-5 p-3 shad">
      <Container className="d-flex justify-content-center">
        <img src={`/images/${postdata.myImage}`} className="w-50 img" />
        <Container className="ml-4">
          <h2>{postdata.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: postdata.des }} >
          </div>
          <h6>{postdata.tags}</h6>
        </Container>
      </Container>

    </Container>


  )
}
