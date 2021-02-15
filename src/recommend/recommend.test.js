import React from 'react';
import ReactDOM from 'react-dom';
import Recommend from './Recommend';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Recommend />, div);

    ReactDOM.unmountComponentAtNode(div);
});