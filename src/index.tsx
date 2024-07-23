import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { SocketProvider } from './SocketContext';

ReactDOM.render(
    <Provider store={store}>
        <SocketProvider>
            <App />
        </SocketProvider>
    </Provider>,
    document.getElementById('root')
);
