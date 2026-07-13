import ExperienceTabs from '@/components/experience/ExperienceTabs';

export default function ExperiencePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-mono text-[13px] tracking-[3px] text-text-muted uppercase transition-colors duration-300">
          Experience
        </h1>
      </div>

      <ExperienceTabs />
    </div>
  );
}
