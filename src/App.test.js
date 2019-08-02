
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import {BrowserRouter} from "react-router-dom"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


  it('should match snapshot', () => {
    const addingtesting = renderer.create(<BrowserRouter><App /></BrowserRouter>).toJSON();

    expect(addingtesting).toMatchSnapshot();
  });