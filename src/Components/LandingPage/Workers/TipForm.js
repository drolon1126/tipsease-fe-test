import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd, faTimes } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { TweenMax } from "gsap/TweenMax";

const H5 = styled.h5`
color:	#B22222;
font-size: 2rem;
`
const FormModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
    margin: 0 auto;
    width: 800px;
    height: 400px;
    background: #202020;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 0;
`;


const FormLogo = styled.h1`
  font-size: 4rem;
  color: #f3e367;
  margin: 1.5rem auto;
  font-family: "Ubuntu", sans-serif;
  margin-bottom: 1rem;
`;

const TipFormLabel = styled.label`
  color: #c9c9c9;
  font-size: 2.4rem;
  font-family: 'Ubuntu', sans-serif;
  margin: 2rem 0;
`;

const TipFormField = styled(Field)`
  border-radius: 10px;
  border: none;
  padding: 1rem 2rem;
  font-size: 2rem;

  &:focus {
    outline: none;
  }
`;

const TipFormClose = styled.div`
  font-size: 2.8rem;
  color: #c9c9c9;
  margin-left: auto;
  margin-right: 2rem;
  background: none;
  border: none;
  padding: 1rem;

  :hover {
    cursor: pointer;
  }
`;

const TipSubmitButton = styled.button`
  background: none;
  color: #f3e367;
  border: 2px solid #f3e367;
  padding: 1.4rem 2.6rem;
  font-size: 2rem;
  font-family: 'Ubuntu', sans-serif;
  border-radius: 10px;
  transition: all 200ms ease-out;
  text-decoration: none;
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
    font-size: 2.4rem;
  }
`;


function TipForm({ touched, errors, toggleModal }) {

  const buttonUp = e => {
    const btn = e.target;
    TweenMax.to(btn, 0.1, {y: -4})
  }

  const buttonDown = e => {
    const btn = e.target;
    TweenMax.to(btn, 0.1, {y: 0})
  }

  return (
    <FormModal>
    <Form>
      <FormContainer>
      <TipFormClose onClick={toggleModal}><FontAwesomeIcon icon={faTimes} /></TipFormClose>
      <FormLogo>tipsEase</FormLogo>
    <TipFormLabel htmlFor = "username">Enter tip amount</TipFormLabel>
    <TipFormField id="payment" type="payment" autoComplete="off" placeholder="Amount" name = "payment"/>
     <H5>{touched.payment && errors.username}</H5>
    <div className='tip-button-container'>
    <TipSubmitButton onMouseEnter={buttonUp} onMouseLeave={buttonDown} type="submit"><FontAwesomeIcon icon={faHandHoldingUsd} /> Pay</TipSubmitButton>
    </div>
    </FormContainer>
 </Form> 
 </FormModal>
  );
}

export default withFormik({
  mapPropsToValues() {
    return {
       
        payment: ''
       
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
    .min(1,"Must tip at least 1 dollar")

  }),

  handleSubmit(values, formikBag) {
    

    //   {if(token === null){
    //     Swal.fire({
    //         position: 'center',
    //         type: 'error',
    //         title: 'Try Again!',
    //         showConfirmButton: false,
    //         timer: 2500
    //       })
    //   }else{
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Thanks for your tip',
            showConfirmButton: false,
            timer: 1500
          })
    //   }}

  }
})(TipForm);
