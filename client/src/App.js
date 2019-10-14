import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  //const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="nav">
        <Link className = "nav" to="/">Login</Link>

        {/* <Link to="/protected">Bubble Page</Link> */}

        <Route exact path="/" component={Login} />
        <PrivateRoute path="/protected" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
