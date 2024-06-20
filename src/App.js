import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Darshboard from "./pages/darshboard";
import Login from "./pages/login";

function App() {
  return (
    <>
        <Routes>
          <Route path="/:path?" element={<Darshboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
    </>
  );
}

export default App;
