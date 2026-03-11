import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/projects';

const statusStyles: Record<ProjectStatus, string> = {
  shipped: 'text-text-secondary',
  'in progress': 'text-text-muted',
  archived: 'text-text-faint',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn('font-mono text-[11px] px-3.5 py-0.5 rounded-[14px] bg-badge-bg transition-all duration-300', statusStyles[status])}>
      {status}
    </span>
  );
}
