import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Recommend from './Recommend';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
          <Recommend />
        </BrowserRouter>    
  , div);

    ReactDOM.unmountComponentAtNode(div);
});