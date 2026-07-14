'use client';
import { useState } from 'react';

/** Active filter category (a service, an industry, or 'All'). */
export function useGalleryFilter(initial = 'All') {
  const [category, setCategory] = useState(initial);
  return { category, setCategory, reset: () => setCategory('All') };
}
