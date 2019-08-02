import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
//Use react router to make the button go to a new route that renders the CreateWorker.js Component
import { TweenMax } from "gsap/TweenMax";


const WorkerButton = styled(Link)`
    font-size: 2rem;
    padding: 1.2rem 2.2rem;
    border-radius: 5px;
    background: #252525;
    font-family: 'Ubuntu', sans-serif;
    text-transform: uppercase;
    border: none;
    color: #f3e367;
    margin: 2.5rem;
    text-decoration:none;

    &:hover {
        cursor: pointer;
        text-decoration:underline;
    }

    &:focus {
        outline: none;
    }

    svg {
        margin-right: 1rem;
    }
`;

function CreateWorkerButton() {

    const workerButtonUp= e => {
        const btn = e.target;
        TweenMax.to(btn, 0.2, {y: 2});    
    }
    const workerButtonDown= e => {
        const btn = e.target;
        TweenMax.to(btn, 0.2, {y: 0});    
    }

    return (
        <WorkerButton to="/CreateWorker" onMouseEnter={workerButtonUp} onMouseLeave={workerButtonDown}><FontAwesomeIcon icon={faPlusSquare} />New Worker</WorkerButton>   
    )
}

export default CreateWorkerButton

