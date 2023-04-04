/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { ProtectedRoutes, PublicRoutes } from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route exact path="/" element={<Register />} />
            <Route exact path="/sign-in" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
