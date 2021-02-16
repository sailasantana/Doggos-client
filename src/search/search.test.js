import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './search';
import {BrowserRouter} from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
    <BrowserRouter>
        <SearchForm />
    </BrowserRouter>    
    , div);

    ReactDOM.unmountComponentAtNode(div);
});