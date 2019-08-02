import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { TweenMax } from "gsap/TweenMax";
import TipForm from "./TipForm";

const TipButton = styled(Link)`
  background: none;
  color: #f3e367;
  border: 2px solid #f3e367;
  padding: 1.6rem 2.8rem;
  font-size: 1.9rem;
  font-family: 'Ubuntu', sans-serif;
  border-radius: 10px;
  transition: all 200ms ease-out;
  text-decoration: none;
  margin-top: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;

  :hover {
    cursor: pointer;
    background: #f3e367;
    color: black;
  }

  :focus {
      outline: none;
  }

  svg {
    margin-right: 0.8rem;
  }
`;

function Tip(props) {
    //Fancy JS Logic
    const buttonUp = e => {
      const btn = e.target;
      TweenMax.to(btn, 0.1, {y: -4})
    }

    const buttonDown = e => {
      const btn = e.target;
      TweenMax.to(btn, 0.1, {y: 0})
    }

    
    
    return (
        <TipButton onClick={props.toggleModal} onMouseEnter={buttonUp} onMouseLeave={buttonDown}><FontAwesomeIcon icon={faCoins} />Add Tip</TipButton>
        )
    
}

export default Tip
