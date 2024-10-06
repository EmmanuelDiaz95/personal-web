import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Sun, Moon, Search } from 'lucide-react';
import './App.css';

const projects = [
  {
    title: "Choice Empowers",
    image: "https://via.placeholder.com/400x300",
    description: "Home building site for affordable housing. Improving an existing home building web platform to help families design their home.",
    role: "Lead UX Designer + Researcher",
    methods: "User interviews, field studies, card sorting, usability testing, paper prototyping, rapid prototyping"
  },
  {
    title: "Proyectos Productivos",
    image: "https://via.placeholder.com/400x300",
    description: "Digitization of a non-digital application process to create better access to city funding and programs for small business owners in Monterrey, Mexico.",
    role: "UX Designer + Researcher",
    methods: "Process mapping, field study, user interviews, interoperability analysis, data review"
  }
];

function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="order-2 lg:order-1">
        <img
          src="https://via.placeholder.com/600x800"
          alt="Emmanuel"
          width={600}
          height={800}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-8 order-1 lg:order-2">
        <p className="text-xl text-gray-400">Hello / Hola</p>
        <h2 className="text-5xl font-extrabold leading-tight">
          I'm Emmanuel, a <span className="text-gray-300">Tech-Finance Professional</span> committed to creating spatial justice through technology.
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          My journey in participatory design began as an urban designer leading community processes to transform streets into amenable spaces for children. My practice has grown to explore the intersections of policy, space, and technology.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          As an interdisciplinary practitioner, my experiences do not always fit into clear buckets. However, at the root of everything I do is a commitment to deeply understanding problems from the perspectives of those who face them, and placing those issues in their broader systemic context.
        </p>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold">PROJECTS</h2>
        <p className="text-xl text-gray-400">
          UX design, research projects, and participatory urban design work, spanning and melding the physical and the digital.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        {projects.map((project, index) => (
          <div key={index} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-auto rounded-md"
            />
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">My Role:</span> {project.role}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Methods:</span> {project.methods}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <header className={`p-6 sticky top-0 z-10 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="flex space-x-4">
              <button onClick={() => setCurrentSection('home')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'home' ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : 'hover:bg-gray-700 dark:hover:bg-gray-700'}`}>About</button>
              <button onClick={() => setCurrentSection('projects')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'projects' ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : 'hover:bg-gray-700 dark:hover:bg-gray-700'}`}>Projects</button>
              <a href="#blog" className="px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Blog</a>
              <a href="#contact" className="px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto mt-16 p-4 pb-20">
          {currentSection === 'home' && <HomePage />}
          {currentSection === 'projects' && <ProjectsPage />}
        </main>

        <footer className={`fixed bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="flex justify-between max-w-6xl mx-auto">
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
