import React from 'react';
import { projects } from '../data/projects';

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

export default ProjectsPage;
