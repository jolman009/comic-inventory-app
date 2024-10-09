"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addComic } from '../services/comicService';
import { TextField, Button, Box } from '@mui/material';

type ComicFormInput = {
  title: string;
  issueNumber: number;
  publisher?: string;
  condition?: string;
  cgcGrade?: number;
  purchasePrice?: number;
  notes?: string;
};

const ComicForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ComicFormInput>();

  const onSubmit: SubmitHandler<ComicFormInput> = async (data) => {
    try {
      await addComic(data);
      reset();
      alert('Comic added successfully!');
    } catch (error) {
      alert('Failed to add comic. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Title" {...register('title', { required: true })} />
      <TextField label="Issue Number" type="number" {...register('issueNumber', { required: true })} />
      <TextField label="Publisher" {...register('publisher')} />
      <TextField label="Condition" {...register('condition')} />
      <TextField label="CGC Grade" type="number" {...register('cgcGrade')} />
      <TextField label="Purchase Price" type="number" {...register('purchasePrice')} />
      <TextField label="Notes" multiline rows={4} {...register('notes')} />
      <Button type="submit" variant="contained">Add Comic</Button>
    </Box>
  );
};

export default ComicForm;