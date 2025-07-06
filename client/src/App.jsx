import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubmitTool from './pages/SubmitTool';
import ToolDetails from './pages/ToolDetails';
import Login from './pages/Login';
import Signup from "./pages/Signup"; 


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitTool />} />
            <Route path="/tool/:id" element={<ToolDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
