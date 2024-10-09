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
            <li key={comic.id}>{comic.title} - Issue #{comic.issueNumber}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComicList;
