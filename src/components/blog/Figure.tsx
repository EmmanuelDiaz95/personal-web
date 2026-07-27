import Image from 'next/image';

interface FigureProps {
  src: string;
  /** Doubles as the caption — written as an interpretive sentence, not a label. */
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Image plus caption. The image breaks out wider than the prose measure so
 * screenshots stay legible; the caption stays at measure width beneath it.
 */
export default function Figure({ src, alt, width = 1600, height = 1000 }: FigureProps) {
  return (
    <figure className="my-10 lg:-mx-20">
      <div className="overflow-hidden rounded-[10px] border border-border bg-surface">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-[68ch] font-mono text-xs leading-relaxed text-text-muted">
        {alt}
      </figcaption>
    </figure>
  );
}
