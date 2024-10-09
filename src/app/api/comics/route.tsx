// src/components/ComicList.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { fetchComics } from '../services/comicService';

type Comic = {
  id: number;
  title: string;
  issueNumber: number;
  publisher?: string;
  condition?: string;
  cgcGrade?: number;
  purchasePrice?: number;
  notes?: string;
  metadata?: any; // Update to reflect metadata
};

const ComicList: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getComics = async () => {
      try {
        const data = await fetchComics();
        setComics(data);
      } catch (err) {
        setError('Failed to fetch comics');
      }
    };
    getComics();
  }, []);

  return (
    <div>
      <h2>Comic Inventory</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {comics.map((comic) => (
            <li key={comic.id}>
              <strong>{comic.title}</strong> - Issue #{comic.issueNumber}
              {comic.metadata && (
                <div>
                  <p>Publisher: {comic.metadata.publisher?.name}</p>
                  <p>Release Date: {comic.metadata.cover_date}</p>
                  <p>Writers: {comic.metadata.person_credits?.map((p: any) => p.name).join(', ')}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComicList;
