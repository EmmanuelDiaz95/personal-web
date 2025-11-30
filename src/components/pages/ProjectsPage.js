import React from 'react';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const ProjectsPage = () => {
  return (
    <section className="space-y-16" aria-labelledby="projects-heading">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 id="projects-heading" className="text-5xl font-extrabold">
          PROJECTS
        </h1>
        <p className="text-xl text-gray-400">
        Where curiosity meets action—projects exploring technology, automation, and what's possible.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-16">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
