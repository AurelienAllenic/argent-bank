import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from "./components/User";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
