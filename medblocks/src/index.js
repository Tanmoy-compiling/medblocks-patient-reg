import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PGliteProvider } from "@electric-sql/pglite-react";
import db from "./integrations/pglite"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PGliteProvider db={db}>
    <App />
  </PGliteProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
