import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SwapForm from "./problem2/SwapForm";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<SwapForm />} />
      </Routes>
    </>
  );
}

export default App;
