import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import "../../App.css"
import posed from "react-pose";
import serveImg from "../../imgs/adult-beverage-black-coffee-733761.jpg";

const H5 = styled.h5`
  color: #b22222;
`;

const FormContainer = styled.div`
  position: relative;
  min-width: 50em;
  max-width: 50em;
  margin: 0em auto;
  top: 40em;
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  min-height: 45em;
  justify-content: space-evenly;
  background: #202020;
  box-shadow: 0px 12px 22px -1px #545309;
  border-radius: 10px;
  font-family: "Ubuntu", sans-serif;
`;

const Butt = posed.button({
  hoverable: true,
  pressable: true,
  init: {
    scale: 0.8,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 1px 10px #B1B7B7 "
  },
  press: {
    scale: 1,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  },
  focus: {
    outline:0
  }
});

const BTN =styled.button`
  background: none;
  color: #f3e367;
  border: 1px solid #f3e367;
  padding: 1.2rem 2.4rem;
  font-size: 2rem;
  font-family: 'Ubuntu', sans-serif;
  border-radius: 10px;
  transition: all 250ms ease-out;
  margin-top: 1.4rem;
  text-decoration:none;
  transition: all 250ms ease-out;

  :hover {
    cursor: pointer;
    background: #f3e367;
    color: black;
    transition: all 250ms ease-in-out;
  }

  :focus {
      outline: none;
  }

  svg {
    margin-right: 0.6rem;
  }
`
// const Butt = posed.div({
//   hoverable: true,
//   pressable: true,
//   init: {
//     scale: 0.8,
//     boxShadow: "0px 0px 0px rgba(0,0,0,0)"
//   },
//   hover: {
//     scale: 1,
//     boxShadow: "0px 1px 10px #B1B7B7 "
//   },
//   press: {
//     scale: 1,
//     boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
//   }
// });

const Label = styled.label`
  color: #f3e367;
  font-size: 2.5em;
`;

function Login({ touched, errors }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className={'signUpPage'}>
      <img className='formPageImg' src={serveImg}/>
    <Form className="form">
      <FormContainer>
        <Label htmlFor="username">Username</Label>
        <Field
          id="username"
          type="username"
          autoComplete="off"
          placeholder="username"
          name="username"
        />
        <H5>{touched.username && errors.username}</H5>
        <Label htmlFor="password">Password</Label>
        <Field
          id="password"
          type="password"
          autoComplete="off"
          placeholder="password"
          name="password"
        />
        <H5>{touched.password && errors.password}</H5>
        {/* <Label htmlFor = "confirmPassword">Confirm your password</Label>
    <Field id="passwordConfirmation" type="password" placeholder="passwordConfirmation" name="passwordConfirmation"/>
   <H5>{touched.passwordConfirmation && errors.passwordConfirmation}</H5>
   <Label htmlFor = "rememberPassword">Let us remember your password?</Label>
    <Field id="rememberPassword" type="checkbox" name="rememberPassword"/>
    <H5>{touched.rememberPassword && errors.rememberPassword}</H5> */}
        <Butt className="formButt" type="submit">
          Login
        </Butt>
      </FormContainer>
    </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
      // confirmPassword: "",
      // rememberPassword: false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(20, "Must be less than 20 characters")
      .required("This field is required"),
    password: Yup.string()
      .min(2, "Must be 3 characters or more")
      .max(100, "Must be less than 100 characters")
      .required("Enter a password to continue")
    // passwordConfirmation: Yup.string()
    // .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  }),
  handleSubmit(values, formikBag) {
    console.log(values,"Login values")
    axios
      .post(`https://usemytechstuff.herokuapp.com/api/auth/login/`, values)
      .then((response) => {
        localStorage.setItem('token', response.data.payload);
        console.log('does token data exist:', response.data.payload)
        formikBag.props.history.push('/');
        formikBag.props.setToken(response.data.payload)
      })
      .catch((e) => {
        // console.log(e.response.data && response.data);
      });
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
            title: 'Welcome Back!',
            showConfirmButton: false,
            timer: 2500
          })
    //   }}

  }

})(Login);