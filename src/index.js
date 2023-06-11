import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom' 


// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    
  //   <HomePage />
  // </React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
//  放在需要metamask的地方
// reportWebVitals();
