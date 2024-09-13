import React from 'react';
import Card from './Card';
import './Column.css';

const Column = ({ title, tasks }) => {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="task-list">
        {tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
