import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Templates from "./Views/Templates"
import Performance from "./Views/Performance"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <h1>Acromático Templates</h1>
        <nav>
          <ul>
            <li><Link to={"/"}>Shopify Templates</Link></li>
            <li><Link to={"/performance"}>Page Speed Report</Link></li>
          </ul>
        </nav>
      </main>
      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </div>
  );
}

export default App;
