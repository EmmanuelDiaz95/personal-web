import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import StatusBadge from '@/components/ui/StatusBadge';
import TagPill from '@/components/ui/TagPill';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-150 mb-8"
      >
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <StatusBadge status={project.status} />
      </div>

      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">ROLE</div>
          <div className="text-sm">{project.role}</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">TIMELINE</div>
          <div className="text-sm">{project.timeline}</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-5">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-2">TEAM</div>
          <div className="text-sm">{project.team}</div>
        </div>
      </div>

      <div className="text-[15px] text-text-secondary leading-relaxed mb-8 whitespace-pre-line transition-colors duration-300">
        {project.fullDescription}
      </div>

      {project.outcomes.length > 0 && (
        <div className="mb-8">
          <div className="font-mono text-[11px] tracking-[2px] text-text-muted mb-4">OUTCOMES</div>
          <ul className="space-y-2">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-text-muted mt-0.5">—</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
