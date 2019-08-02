import React,{useState,useContext} from "react";
import styled from "styled-components";
import axios from 'axios'
import Tip from './Tip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { WorkersListContext } from "../../Context/Contexts";

const WorkerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Varela Round', sans-serif;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const WorkerImage = styled.div`
  height: 185px;
  width: 200px;
  border-radius: 5px;
  background: url(${props => props.photo_url});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 12px 0px #383838;
`;

const WorkerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 3.5rem;
  `;

const WorkerName = styled.h2`
  font-size: 3.4rem;
  margin: 0.5rem 0;
  color: #f3e367;
  font-family: 'Ubuntu', sans-serif;
  letter-spacing: 2px;
  width: 100%;
  text-align: left;
  padding: 0 1.5rem;

  @media (max-width: 600px) {
    font-size: 2.8rem;
  }
`;

const WorkerProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  width: 90%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

`;

const WorkerText = styled.p`
  font-size: 1.8rem;
  text-align: left;
  line-height: 3.2rem;
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-family: 'Ubuntu', sans-serif;
`;

const WorkerRole = styled(WorkerText)`
  font-size: 2.4rem;
  color: white;
  font-family: 'Ubuntu', sans-serif;
  letter-spacing: 1px;
`;

const WorkerEmployment = styled(WorkerText)`
  color: white;
  font-size: 2.2rem;
  font-family: 'Varela Round', sans-serif;
  
`;

const WorkerCloseButton = styled.button`
  font-size: 2.8rem;
  color: #c9c9c9;
  background: none;
  border: none;
  padding: 0.8rem;
  position: absolute;
  top: 0;
  right: 1rem;

  :hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const WorkerCard = ({ id,tagline,company,photo_url, firstName, lastName, role, timeEmployed, modal, toggleModal }) => {
  const {workerList,setWorkerList} = useContext(WorkersListContext);
  
  function removeWorker() {
    //DELETE /api/tippers/:id
    axios.delete(`https://tipsease-be-test.herokuapp.com/api/tippees/${id}`)
    .then((res)=>{
      axios.get(`https://tipsease-be-test.herokuapp.com/api/tippees`)
      .then(apiObject=>{
         setWorkerList(apiObject.data)
       })
       .catch( err => {
         console.log("Inside Error:", err);
       })   
    })
    .catch( err => {
      console.log("Outside Error:", err);
    })    
  }

  return (
    <WorkerCardContainer>
      <WorkerCloseButton onClick ={removeWorker}><FontAwesomeIcon icon={faTimes} /></WorkerCloseButton>
      <WorkerName>{firstName} {lastName}</WorkerName>
      
      <WorkerProfile>
      <WorkerImage photo_url={photo_url} />
      <WorkerInfo>
        <WorkerRole>{tagline}</WorkerRole>
        <WorkerText>Employed for<br /><WorkerEmployment>1 year, 2 months</WorkerEmployment></WorkerText>
        <Tip toggleModal={toggleModal} />
        </WorkerInfo>

      </WorkerProfile>
    </WorkerCardContainer>
  );
}

export default WorkerCard;