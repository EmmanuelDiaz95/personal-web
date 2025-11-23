import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <article className="space-y-4 bg-blue-900/30 p-6 rounded-lg shadow-md hover:bg-blue-900/40 transition-colors">
        <img
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-auto rounded-md"
        />
        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400">{project.description}</p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">My Role:</span> {project.role}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Methods:</span> {project.methods}
        </p>
        <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all">
          <span>View Project</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
