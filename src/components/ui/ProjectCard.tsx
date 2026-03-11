import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import TagPill from '@/components/ui/TagPill';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 block"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-[13px] text-text-faint transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        <StatusBadge status={project.status} />
      </div>
      <h2 className="text-lg font-semibold mb-2 leading-tight transition-colors duration-300">{project.title}</h2>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-4 transition-colors duration-300">{project.description}</p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </Link>
  );
}
