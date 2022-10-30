import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import App from "./App";
import Users from "./pages/users";
import Tasks from "./pages/tasks";

const container = document.getElementById("root")!;
const root = createRoot(container);


root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center"/>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

