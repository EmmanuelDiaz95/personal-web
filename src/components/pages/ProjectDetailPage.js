import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug } from '../../data/projects';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-gray-400">{project.description}</p>
      </header>

      {/* Project Image */}
      <div className="mb-12">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-900/30 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">My Role</h3>
          <p className="text-white">{project.role}</p>
        </div>
        <div className="bg-blue-900/30 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Timeline</h3>
          <p className="text-white">{project.timeline}</p>
        </div>
        <div className="bg-blue-900/30 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Team</h3>
          <p className="text-white">{project.team}</p>
        </div>
      </div>

      {/* Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Methods & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {project.methods.split(', ').map((method) => (
            <span
              key={method}
              className="px-3 py-1 bg-blue-800/50 text-sm rounded-full"
            >
              {method}
            </span>
          ))}
        </div>
      </section>

      {/* Full Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About the Project</h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          {project.fullDescription
            .trim()
            .split('\n\n')
            .map((paragraph) => (
              <p key={paragraph.substring(0, 50)}>{paragraph.trim()}</p>
            ))}
        </div>
      </section>

      {/* Outcomes */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Outcomes</h2>
          <ul className="space-y-3">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation to other projects */}
      <footer className="pt-8 border-t border-gray-800">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          View All Projects
        </Link>
      </footer>
    </article>
  );
};

export default ProjectDetailPage;
