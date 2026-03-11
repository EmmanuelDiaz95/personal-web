import StatBlock from '@/components/ui/StatBlock';
import CompanyCard from '@/components/ui/CompanyCard';
import { profileSummary, stats, companies, earlierRoles } from '@/data/experience';

export default function ExperiencePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Experience
        </h1>
      </div>

      <p className="text-[17px] text-text-secondary leading-[1.7] mb-8 max-w-[740px] transition-colors duration-300">
        {profileSummary}
      </p>

      <div className="flex gap-14 py-6 border-t border-b border-border mb-8 flex-wrap transition-colors duration-300">
        {stats.map((stat) => (
          <StatBlock key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4">
        {companies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>

      <p className="font-mono text-[13px] text-text-muted text-center mt-2 transition-colors duration-300">
        {earlierRoles}
      </p>
    </div>
  );
}
