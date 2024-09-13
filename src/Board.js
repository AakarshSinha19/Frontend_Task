import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './Column';
import './Board.css';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        console.log(response.data); // Check if tickets is the right key
        setTasks(response.data.tickets || []); // Set tasks to tickets array
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);  

  const groupedTasks = Array.isArray(tasks) ? tasks.reduce((groups, task) => {
    const group = task[groupBy];
    if (!groups[group]) groups[group] = [];
    groups[group].push(task);
    return groups;
  }, {}) : {};

  Object.keys(groupedTasks).forEach(group => {
    groupedTasks[group].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return (
    <div>
      <div className="controls">
        <label>Group by: </label>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <button onClick={() => setGroupBy(groupBy)}>Display</button>

      <div className="board">
        {Object.keys(groupedTasks).map((group) => (
          <Column key={group} title={group} tasks={groupedTasks[group]} />
        ))}
      </div>
    </div>
  );
};

export default Board;
