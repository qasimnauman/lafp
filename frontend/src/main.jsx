import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ItemProvider } from "./context/ItemContext"; // ⬅️ Import this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </AuthProvider>
  </React.StrictMode>
);
