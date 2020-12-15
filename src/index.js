import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app/App';
import { Auth } from './app/main/components';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Auth>
            <App />
        </Auth>
    </Provider>,
    document.getElementById('root')
);
