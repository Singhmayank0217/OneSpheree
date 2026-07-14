'use client';
import { useEffect, useState } from 'react';

/**
 * Instant search state. The input stays fully responsive (`query`), while the
 * value used for filtering (`debounced`) settles briefly so the FLIP reflow
 * doesn't thrash on every keystroke.
 */
export function useGallerySearch(delay = 140) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(t);
  }, [query, delay]);

  return { query, setQuery, debounced, clear: () => setQuery('') };
}
