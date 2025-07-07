import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import AuthState from "./context/auth/authState";

function App() {
  return (
    <AuthState>
      <NoteState>
        <Router>
          
          <Navbar />
          <Alert message={"This is amazing "}/>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;
