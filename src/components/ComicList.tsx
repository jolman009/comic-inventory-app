"use client";

import React, { useEffect, useState } from 'react';
import { fetchComics, deleteComic, updateComic } from '../services/comicService';
import { Card, CardContent, Typography, Button } from '@mui/material';

type Comic = {
  id: number;
  title: string;
  issueNumber: number;
  publisher?: string;
  condition?: string;
  cgcGrade?: number;
  purchasePrice?: number;
  notes?: string;
  metadata?: {
    publisher?: {
      name: string;
    };
    cover_date?: string;
    person_credits?: { name: string }[];
  };
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

  const handleDelete = async (id: number) => {
    try {
      await deleteComic(id);
      setComics(comics.filter((comic) => comic.id !== id));
    } catch (err) {
      setError('Failed to delete comic');
    }
  };

  const handleEdit = async (comic: Comic) => {
    // Logic to show an editable form to update the comic
    // After editing, send PUT request using `updateComic()`
  };

  return (
    <div>
      <h2>Comic Inventory</h2>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {comics.map((comic) => (
            <Card key={comic.id} style={{ width: '300px' }}>
              <CardContent>
                <Typography variant="h5">{comic.title}</Typography>
                <Typography variant="subtitle1">Issue #{comic.issueNumber}</Typography>
                {comic.metadata && (
                  <div>
                    <Typography variant="body2">Publisher: {comic.metadata.publisher?.name}</Typography>
                    <Typography variant="body2">Release Date: {comic.metadata.cover_date}</Typography>
                    <Typography variant="body2">
                      Writers: {comic.metadata.person_credits?.map((p) => p.name).join(', ')}
                    </Typography>
                  </div>
                )}
                <Button onClick={() => handleEdit(comic)}>Edit</Button>
                <Button onClick={() => handleDelete(comic.id)} color="error">
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComicList;