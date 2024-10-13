import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Appbar from "./components/Appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {


  return (
    <>
      <Router>
          <Appbar/>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

export const BASE_URL = 'http://localhost:3000/admin/'
