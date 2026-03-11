'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SearchBar from '@/components/ui/SearchBar';
import CTACard from '@/components/ui/CTACard';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) =>
    [p.title, p.description, ...p.tags].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-7 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Selected Work
        </h1>
        <SearchBar placeholder="Search projects..." value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-10">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        <CTACard />
      </div>
    </div>
  );
}
