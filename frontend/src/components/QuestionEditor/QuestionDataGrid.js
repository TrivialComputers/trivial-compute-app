import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90 
  },
  {
    field: 'question',
    headerName: 'Question',
    width: 150,
    editable: true,
  },
  {
    field: 'answer',
    headerName: 'Answer',
    width: 150,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true,
  },
];

export default function QuestionDataGrid({ refresh}) {
  const [rows, setRows] = useState([]);
  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      console.log(data.questions);
      setRows(data.questions);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setStatus('Error fetching messages');
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [refresh]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
