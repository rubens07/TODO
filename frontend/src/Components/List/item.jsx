import React, { useState } from 'react';

const Item = (props) => {
  const {
    text,
    taskId,
    todo,
    updateTask,
    deleteTask,
    status,
  } = props;
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(text);

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const handleEdit = () => {
    if (edit) {
      updateTask({
        id: taskId,
        description: task,
        status
      });
    }
    setEdit(!edit);
  }

  const handleCheck = (newStatus) => {
    updateTask({
      id: taskId,
      description: task,
      status: newStatus
    });
  };

  const removeTask = () => {
    deleteTask(taskId);
  };

  return (
    <div className="item">
      <div className='item-text'>
        {edit && (
          <input
            type="text"
            name="editForm"
            autoFocus
            value={task}
            onChange={handleChange}
          />
        )}
        {!edit && (
          <span className={todo ? '' : 'done'}>{task}</span>
        )}
      </div>
      <div className='item-buttons'>
        {todo && (
          <>
            <button onClick={handleEdit} >
              <img src={edit ? 'save.ico' : 'edit.ico'} alt='Edit Task' />
            </button>
            <button onClick={() => handleCheck(1)} >
              <img src='check.ico' alt='Edit Task' />
            </button>
          </>
        )}
        {!todo && (
          <>
            <button onClick={removeTask} >
              <img src='delete.ico' alt='Edit Task' />
            </button>
            <button onClick={() => handleCheck(0)} >
              <img src='back.ico' alt='Edit Task' />
            </button>
          </>
        )}
      </div>
    </div>
  )
};

export default Item;
