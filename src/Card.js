import React from 'react';

const Card = ({ task }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="task-id">{task.id}</span>
        <img src={task.userAvatar} alt="user-avatar" className="user-avatar" />
      </div>
      <h3 className="task-title">{task.title}</h3>
      <div className="task-labels">
        <span className="task-priority">{getPriorityLabel(task.priority)}</span>
        <span className="task-type">{task.type}</span>
      </div>
    </div>
  );
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No Priority';
  }
};

export default Card;
