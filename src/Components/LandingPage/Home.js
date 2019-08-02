import React,{useEffect,useState,useContext} from 'react';
import {TokenContext} from '../Context/Contexts';
import axios from "axios";
import styled from "styled-components"
import AxiosWithAuth from "./AxiosWithAuth"
import CreateWorkerButton from './CreateWorker/CreateWorkerButton';
import CreateWorker from './CreateWorker/CreateWorker';
import WorkersGrid from './Workers/WorkersGrid';
import WorkersDropdown from './Workers/WorkersDropdown';
import WorkerButtons from './Workers/WorkerButtons';
import TipForm from '../LandingPage/Workers/TipForm'

const Sap = styled.div`
font-family: sans-serif;
text-align: center;
height: 100%;
background: #e8e8e8;
`

const Home = () => {
  // const [starwarsChars, setChars] = useState()
  const { token,setToken } = useContext(TokenContext);
  localStorage.getItem("token")
    const [data, setData] = useState({});
    
localStorage.getItem('token')
    useEffect(() => {
      setToken(localStorage.getItem('token'))
      console.log('test')
    }, [token,setToken]);
    const [secretData, setSecretData] = useState([]);
    function setRestricted(res) {
      setSecretData(res);
    }
    useEffect(() => {
      AxiosWithAuth()
        .get("http://localhost:4000/restricted/data")
        .then(res => {
          console.log(res);
          setRestricted(res.data);
        })
        .catch(err => console.log(err));
    }, []);
    const fetchData = () => {
      axios.get(`http://localhost:4000/api/restricted/data`)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  console.log("token","does context get this")
    useEffect(fetchData, [localStorage.getItem('token')]);
  console.log(data,"data")
//export const TokenContext = createContext();

const [modal, setModal] = useState(false);

const toggleModal = () => {
 setModal(!modal);
 console.log(modal);
}

  return(
    <div>
 <Sap className="App">

{/* <WorkerType/> */}
{/* Create worker is where you will be able to create a new worker.  */}
<WorkerButtons />
<WorkersGrid modal={modal} toggleModal={toggleModal}/>
{/* <WorkerCard/> */}
{modal === true ? <TipForm toggleModal={toggleModal} /> : null}
{/* <WorkerCard/> */}

       </Sap>
    </div>
  )
}

export default Home;