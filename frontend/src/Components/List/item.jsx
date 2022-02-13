import React, { useState } from 'react';

const Item = ({ text, todo }) => {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(text);

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  }

  // Botão Edit: aparece apenas na lista TODO
  // Botão Check: aparece apenas na lista TODO
  // Botão Excluir: aparece apenas na lista Done
  // Botão Uncheck: Aparece apenas na lista Done
  return (
    <div className="item">
      <div className='item-text'>
        {edit && (
          <input
            type="text"
            name="editForm"
            autoFocus value={task}
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
              <img src='edit.ico' alt='Edit Task' />
            </button>
            <button onClick={handleEdit} >
              <img src='check1.ico' alt='Edit Task' />
            </button>
          </>
        )}
        {!todo && (
          <>
            <button onClick={handleEdit} >
              <img src='delete.ico' alt='Edit Task' />
            </button>
            <button onClick={handleEdit} >
              <img src='back.ico' alt='Edit Task' />
            </button>
          </>
        )}
      </div>
    </div>
  )
};

export default Item;
