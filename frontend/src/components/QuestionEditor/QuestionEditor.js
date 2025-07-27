import QuestionDataGrid from './QuestionDataGrid';
import QuestionForm from './QuestionForm';

import React, { useState } from 'react';

export default function QuestionEditor() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <QuestionDataGrid refresh={refresh}/>
          <QuestionForm onSubmitSuccess={handleRefresh}/>
        </div>
      </>
    );
}
