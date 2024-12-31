import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PortfolioList from "./pages/PortfolioList";
import PortfolioSingle from "./pages/PortfolioSingle";
// import data from "./data.json";
import { supabase } from './supabase'
console.log(supabase);
function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchProjects() {
      const { data: projects } = await supabase.from('portfolio').select()
      console.log(projects);
      if (projects.length > 0) {
        setProjects(projects)
      }
    }

    fetchProjects()  
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={projects}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/portfolio" element={<PortfolioList data={projects} />} />
        <Route path="/portfolio/:id" element={<PortfolioSingle data={projects} />} />
      </Routes>
    </Router>
  );
}

export default App;