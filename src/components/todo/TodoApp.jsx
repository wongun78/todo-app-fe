import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider from "./security/AuthContext";
import TodoComponent from "./TodoComponent";
import "./TodoApp.css";

function ToDoApp() {
  return (
    <div className="ToDoApp">
      <AuthProvider>
        <HeaderComponent></HeaderComponent>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<LoginComponent></LoginComponent>}
            ></Route>
            <Route path="/welcome/:username" element={<WelcomeComponent />} />
            <Route path="*" element={<ErrorComponent></ErrorComponent>}></Route>
            <Route
              path="/todos"
              element={<ListTodosComponent></ListTodosComponent>}
            ></Route>
            <Route
              path="/logout"
              element={<LogoutComponent></LogoutComponent>}
            ></Route>
            <Route
              path="/todo/:id"
              element={<TodoComponent></TodoComponent>}
            ></Route>
          </Routes>
        </BrowserRouter>
        <FooterComponent></FooterComponent>
      </AuthProvider>
    </div>
  );
}

export default ToDoApp;
