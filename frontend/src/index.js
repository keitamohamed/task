import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css'
import store from "./store/store";
import AuthProvider from "./component/context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </Provider>
);

