
import React, { useState, useEffect, useContext } from "react";
import { Route, NavLink } from "react-router-dom";
import axios from 'axios'
import PrivateRoute from "./Components/SecretData/PrivateRoute";
import Login from "./Components/Login/Login";

import Home from "./Components/LandingPage/Home";
import { TokenContext, WorkersListContext, FilterContext } from "./Components/Context/Contexts";
import SignUp from "./Components/SignUp/SignUp";
import styled from "styled-components";
import Swal from "sweetalert2";
import TipForm from "./Components/LandingPage/Workers/TipForm";
import TipModal from "./Components/LandingPage/Workers/TipModal";
import "./App.css";
import CreateWorker from './Components/LandingPage/CreateWorker/CreateWorker'



const NavbarContainer = styled.div`
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 4.8rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  @media (max-width: 800px) {
    padding: 0.5rem 2.4rem;
    background: black;
  }
`;

const NavLogo = styled.div`
  font-size: 2.9rem;
  color: #f3e367;
  margin-right: auto;
  font-family: "Ubuntu", sans-serif;
  font-weight: 500;

  @media (max-width: 800px) {
    font-size: 2.2rem;
  }
`;

const NavItems = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Varela Round", sans-serif;


  @media (max-width: 1100px) {
    width: 55%;
  }

  @media (max-width: 800px) {
    width: 70%;
  }
`;

const NavItem = styled(NavLink)`
  color: #c9c9c9;
  text-transform: uppercase;
  transition: color 200ms ease-out;
  padding: 0.5rem;
  font-size: 1.6rem;
  text-decoration: none;
  :hover {
    color: white;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin: 1rem 0;
    font-size: 1.4rem;
    text-align: center;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const NavCta = styled(NavItem)`
  color: #f3e367;
`;


const Logout = styled.button`
  background: none;
  color: #f3e367;
  border: 2px solid #f3e367;
  padding: 0.8rem 1.5rem;
  font-size: 1.5rem;
  border-radius: 10px;
  transition: all 200ms ease-out;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  :hover {
    cursor: pointer;
    background: #f3e367;
    color: black;
  }
  :focus {
      outline: none;
  }
  @media (max-width: 800px) {
    font-size: 1.3rem;
    padding: 0.8rem 1.2rem;
    border-width: 1px;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-width: 1px;
  }
`;
function App() {
  const [token, setToken] = useState(false);
  const [workerList, setWorkerList] = useState([])
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log("test");
  }, [token]);
  useEffect(() => {
    axios.get(`https://tipsease-be-test.herokuapp.com/api/tippees`)
      .then(apiObject => {
        setWorkerList(apiObject.data)
      })
      .catch(err => {
        console.log("Error:", err);
      })
  }, []);

  // console.log('Token u there brother?: ', token);
  return (
    <div style={{height:'100%'}}>
      <NavbarContainer>
        <NavLogo>tipsEase</NavLogo>
        <NavItems className="nav-items">
          <NavItem exact to="/">Home</NavItem>
          <NavItem to="/About">About</NavItem>
          <NavItem to="/Team">Team</NavItem>
          <NavCta to="/SignUp" activeClassName="active-cta">
            Sign Up
          </NavCta>
          {token === null ? (
            <NavCta to="/login" activeClassName="active-cta">
              Login
            </NavCta>
          ) : (
              <NavCta to="/login" activeClassName="active-cta">
                <Logout
                  className="btn"
                  type="submit"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken();
                  }}
                >
                  Logout
              </Logout>
              </NavCta>
            )}
        </NavItems>
      </NavbarContainer>

      <div style={{height:'100%'}}>
        {/* export const TokenContext = createContext(); */}
        <TokenContext.Provider value={{ token, setToken }}>
          <WorkersListContext.Provider value={{ workerList, setWorkerList }}>
            <FilterContext.Provider value={{ filter, setFilter }}>
              <PrivateRoute
                exact
                path="/"
                component={Home}
              //  token ={token}
              />
              <Route exact path="/About" />
              <Route exact path="/Team" />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} setToken={setToken} />}
              />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/TipForm" component={TipForm} />
              <Route exact path="/CreateWorker" component={CreateWorker} />
            </FilterContext.Provider>
          </WorkersListContext.Provider>
        </TokenContext.Provider>
      </div>
    </div>
  );
  // const handleSubmit =() =>{
  //   Swal.fire({
  //     position: 'center',
  //     type: 'success',
  //     title: 'Logging out!',
  //     showConfirmButton: false,
  //     timer: 2500
  //   })
  // }
}

export default App;

