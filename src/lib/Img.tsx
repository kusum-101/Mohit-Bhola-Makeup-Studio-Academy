import placeholders from '../data/image-placeholders.json';

const WIDTHS = [480, 800, 1200];

interface Props {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Responsive 4:5 WebP image with a blurred inline placeholder and fixed intrinsic size (no CLS). */
export function Img({ name, alt, sizes, priority, className = '' }: Props) {
  const lqip = (placeholders as Record<string, string>)[name];
  return (
    <img
      src={`/images/${name}-800.webp`}
      srcSet={WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={1200}
      height={1500}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`h-full w-full object-cover ${className}`}
      style={lqip ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover' } : undefined}
    />
  );
}
