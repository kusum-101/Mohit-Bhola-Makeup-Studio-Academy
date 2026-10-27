import type { CSSProperties } from 'react';

/** Inline style setting the `--d` animation/transition delay used by `.rise` and `.reveal`. */
export const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;
