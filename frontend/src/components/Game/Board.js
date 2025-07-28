import React from 'react';

const Board = ({ board, players, colors, onCellClick }) => {
  const createGrid = () => {
    const grid = Array(9).fill(null).map(() => Array(9).fill(null));
    
    const boardLayout = [
      [{ type: 'roll' }, { type: 'question', category: 0 }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'hq', category: 3 }, { type: 'question', category: 0 }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'roll' }],
      [{ type: 'question', category: 3 }, null, null, null, { type: 'question', category: 0 }, null, null, null, { type: 'question', category: 1 }],
      [{ type: 'question', category: 2 }, null, null, null, { type: 'question', category: 3 }, null, null, null, { type: 'question', category: 0 }],
      [{ type: 'question', category: 1 }, null, null, null, { type: 'question', category: 2 }, null, null, null, { type: 'question', category: 3 }],
      [{ type: 'hq', category: 0 }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'question', category: 3 }, { type: 'center' }, { type: 'question', category: 0 }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'hq', category: 3 }],
      [{ type: 'question', category: 0 }, null, null, null, { type: 'question', category: 1 }, null, null, null, { type: 'question', category: 2 }],
      [{ type: 'question', category: 3 }, null, null, null, { type: 'question', category: 0 }, null, null, null, { type: 'question', category: 1 }],
      [{ type: 'question', category: 2 }, null, null, null, { type: 'question', category: 3 }, null, null, null, { type: 'question', category: 0 }],
      [{ type: 'roll' }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'question', category: 3 }, { type: 'hq', category: 0 }, { type: 'question', category: 1 }, { type: 'question', category: 2 }, { type: 'question', category: 3 }, { type: 'roll' }]
    ];

    return boardLayout;
  };

  const grid = createGrid();

  const getCellStyle = (cell) => {
    if (!cell) return { backgroundColor: 'transparent' };
    
    const baseStyle = {
      width: '60px',
      height: '60px',
      border: '2px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      position: 'relative'
    };

    switch (cell.type) {
      case 'center':
        return {
          ...baseStyle,
          backgroundColor: 'white',
          fontSize: '10px'
        };
      case 'hq':
        return {
          ...baseStyle,
          backgroundColor: colors[cell.category],
          color: 'white',
          fontSize: '14px'
        };
      case 'question':
        return {
          ...baseStyle,
          backgroundColor: colors[cell.category]
        };
      case 'roll':
        return {
          ...baseStyle,
          backgroundColor: 'white',
          fontSize: '10px'
        };
      default:
        return baseStyle;
    }
  };

  const getCellContent = (cell, rowIndex, colIndex) => {
    if (!cell) return '';
    
    switch (cell.type) {
      case 'center':
        return 'Trivial Compute';
      case 'hq':
        return 'HQ';
      case 'roll':
        return 'Roll Again';
      default:
        return '';
    }
  };

  const getCellIndex = (rowIndex, colIndex) => {
    return rowIndex * 9 + colIndex;
  };

  const getPlayersAtPosition = (rowIndex, colIndex) => {
    const cellIndex = getCellIndex(rowIndex, colIndex);
    return (players || []).filter(player => player && player.position === cellIndex);
  };

  const renderPlayerTokens = (playersAtCell) => {
    if (playersAtCell.length === 0) return null;
    
    return (
      <div style={{ 
        position: 'absolute', 
        top: '2px', 
        right: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        {playersAtCell.map((player, index) => (
          <div
            key={index}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: `hsl(${index * 137.5}, 70%, 50%)`,
              border: '1px solid white',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {player.name[0].toUpperCase()}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(9, 60px)', 
        gridTemplateRows: 'repeat(9, 60px)',
        gap: '0px',
        border: '3px solid black',
        backgroundColor: 'white'
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const playersAtCell = getPlayersAtPosition(rowIndex, colIndex);
            const cellIndex = getCellIndex(rowIndex, colIndex);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={getCellStyle(cell)}
                onClick={() => cell && onCellClick && onCellClick(cellIndex)}
              >
                {getCellContent(cell, rowIndex, colIndex)}
                {renderPlayerTokens(playersAtCell)}
              </div>
            );
          })
        )}
      </div>

      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        gap: '20px',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: colors[0],
            border: '1px solid black'
          }}></div>
          <span>History</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: colors[1],
            border: '1px solid black'
          }}></div>
          <span>Science</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: colors[2],
            border: '1px solid black'
          }}></div>
          <span>Arts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: colors[3],
            border: '1px solid black'
          }}></div>
          <span>Sports</span>
        </div>
      </div>
    </div>
  );
};

export default Board;