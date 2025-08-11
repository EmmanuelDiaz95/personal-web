import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
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

const blogPosts = [
  {
    title: "The Intersection of Urban Design and Technology",
    date: "March 15, 2023",
    excerpt: "Exploring how technology is reshaping urban spaces and community engagement in city planning.",
    readTime: "5 min read",
    category: "Urban Design"
  },
  {
    title: "Participatory Design in Practice",
    date: "February 28, 2023",
    excerpt: "A deep dive into successful participatory design methodologies and their impact on community outcomes.",
    readTime: "7 min read",
    category: "Design Methods"
  },
  {
    title: "Spatial Justice in the Digital Age",
    date: "February 10, 2023",
    excerpt: "How digital tools can help address spatial inequalities and create more equitable urban environments.",
    readTime: "6 min read",
    category: "Technology"
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
          <div key={index} className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors">
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

function BlogPage() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold">BLOG</h2>
        <p className="text-xl text-gray-400">
          Thoughts, insights, and reflections on urban design, technology, and participatory processes.
        </p>
      </div>
      <div className="grid md:grid-cols-1 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
            <h3 className="text-3xl font-bold text-white">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt}</p>
            <div className="pt-2">
              <span className="inline-block bg-blue-800/50 text-blue-200 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all fields');
      return;
    }

    // Simulate form submission
    setSubmitStatus('Sending...');
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold">CONTACT</h2>
        <p className="text-xl text-gray-400">
          Let's connect and explore opportunities for collaboration.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="text-gray-400">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                contact@example.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Monterrey, Mexico</span>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors">
              <Linkedin className="w-5 h-5 text-blue-400" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors">
              <Github className="w-5 h-5 text-blue-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors">
              <Twitter className="w-5 h-5 text-blue-400" />
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              placeholder="Your message"
            ></textarea>
          </div>
          {submitStatus && (
            <div className={`text-sm ${submitStatus.includes('successfully') ? 'text-green-400' : submitStatus.includes('Please') ? 'text-red-400' : 'text-blue-400'}`}>
              {submitStatus}
            </div>
          )}
          <button 
            type="submit"
            disabled={submitStatus === 'Sending...'}
            className="w-full px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Search functionality is a placeholder. You searched for: "${searchQuery}"`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
        <header className={`p-6 sticky top-0 z-10 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="flex space-x-4">
              <button onClick={() => setCurrentSection('home')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'home' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}>About</button>
              <button onClick={() => setCurrentSection('projects')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'projects' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}>Projects</button>
              <button onClick={() => setCurrentSection('blog')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'blog' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}>Blog</button>
              <button onClick={() => setCurrentSection('contact')} className={`px-4 py-2 rounded-full transition-colors ${currentSection === 'contact' ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100') : 'hover:bg-blue-900/30 dark:hover:bg-blue-900/30'}`}>Contact</button>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-blue-900/30 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-blue-900/30 transition-colors">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </header>

        {showSearch && (
          <div className={`p-4 border-b ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}>
            <form onSubmit={handleSearch} className="max-w-6xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, blog posts, or content..."
                  className={`w-full px-4 py-2 pl-10 rounded-md border ${darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
          </div>
        )}

        <main className="max-w-6xl mx-auto mt-16 p-4 pb-20">
          {currentSection === 'home' && <HomePage />}
          {currentSection === 'projects' && <ProjectsPage />}
          {currentSection === 'blog' && <BlogPage />}
          {currentSection === 'contact' && <ContactPage />}
        </main>

        <footer className={`fixed bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="flex justify-between max-w-6xl mx-auto">
            <p className="text-sm text-gray-400">© 2023 Emmanuel. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
}

export default App;
