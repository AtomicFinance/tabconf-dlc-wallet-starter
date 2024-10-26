import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MnemonicProvider } from "./context/MnemonicContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider>
      <MnemonicProvider>
        <Router>
          <App />
        </Router>
      </MnemonicProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
