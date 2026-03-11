import Image from 'next/image';
import type { Company } from '@/data/experience';

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="bg-surface border border-border rounded-[10px] p-7 hover:border-border-hover transition-all duration-300 cursor-default">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-[42px] h-[42px] rounded-[10px] bg-logo-bg border border-logo-border flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.name}
              width={42}
              height={42}
              className="object-cover rounded-[10px]"
            />
          ) : (
            <span className="font-mono text-sm font-semibold text-text-muted transition-colors duration-300">
              {company.monogram}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-text-muted transition-colors duration-300">
          {company.period}
        </span>
      </div>
      <div className="text-[17px] font-semibold mb-1 transition-colors duration-300">{company.name}</div>
      <div className="text-sm text-text-secondary transition-colors duration-300">{company.role}</div>
    </div>
  );
}
