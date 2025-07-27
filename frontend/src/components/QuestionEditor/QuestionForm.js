import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function QuestionForm({ onSubmitSuccess }) {
  const [question, setQuestions] = useState("");
  const [category, setCategory] = useState('');
  const [answer, setAnswer] = useState("");

  const createQuestion = (e) => {
    e.preventDefault();
    const dataToPost = { question, answer, category };

    fetch('/api/create_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Optionally reset the form fields
      setQuestions("");
      setAnswer("");
      setCategory('');

      if (onSubmitSuccess) onSubmitSuccess();
    })
    .catch(error => console.error('Error posting data:', error));
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
        <Box sx={{ flex: 1.5 }}>
          <TextField
            required
            id="question"
            label="Question"
            fullWidth
            value={question}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            required
            id="answer"
            label="Answer"
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <FormControl sx={{ size: 'medium', minWidth: 120 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category"
              value={category}
              label="Category"
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="General Knowledge">General Knowledge</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="outlined" onClick={e => createQuestion(e)} >Submit</Button>
      </Stack>
    </>
  );
}
