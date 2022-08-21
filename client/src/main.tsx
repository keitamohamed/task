import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import AuthProvider from "./setup/context/AuthProvider";
import UIProvider from "./setup/context/UIProvider";
import NotificationProvider from "./setup/context/NotificationProvider";

import App from './App'
import store from "./setup/store/store";

import 'react-datepicker/dist/react-datepicker.css'
import "./assets/scss/@_keyframe.scss"
import "./index.scss"
import "./tailwind.css"
import "./assets/scss/@_responsive.scss"
import "./assets/scss/@mode.scss"

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <Provider store={store}>
        <AuthProvider>
            <UIProvider>
                <NotificationProvider>
                    <App/>
                </NotificationProvider>
            </UIProvider>
        </AuthProvider>
    </Provider>
)
