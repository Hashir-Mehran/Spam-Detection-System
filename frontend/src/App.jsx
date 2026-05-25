import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpamDetector from "./pages/SpamDetector";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Home Route calls the Page component */}
        <Route path="/" element={<SpamDetector />} />
      </Routes>
    </Router>
  );
}

export default App;