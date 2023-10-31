import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/main-styles.scss';
import './assets/styles/loading.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import reportWebVitals from './reportWebVitals';
import { dir } from "i18next";

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom'
import RQProviders from "./providers/ReactQueryProvider"
import Loading from './global-components/Loading';
const languages = ["en", "fr"];
const App = React.lazy(() => import('./App'));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <RQProviders>
      <Suspense fallback = {<Loading/>}>
        <Router>
        <App />
        </Router>
      </Suspense>
      </RQProviders>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
