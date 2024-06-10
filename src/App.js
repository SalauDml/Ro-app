import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Darshboard from "./pages/darshboard";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Darshboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </>
  );
}

export default App;
