import React , {useState,useEffect} from 'react';
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
      <Container>
        <Container>
          <img src={`/images/${postdata.blogProfile}`} className="w-75 img"/>
        
        <Container>
          <h2>{postdata.title}</h2>
          <p>{postdata.des}</p>
        </Container>
        </Container>

      </Container>
   
  
  )
}
