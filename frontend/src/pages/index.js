import React, { useState, useEffect } from 'react';
import Server from '../Connection/Server';
import List from '../Components/List';


export default function Home() {
  const [task, setTask] = useState('');
  const [listTodo, setListTodo] = useState([]);
  const [listDone, setListDone] = useState([]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  useEffect(() => {
    const server = new Server();
    server.getData()
    .then(result => {
      console.log(result);
      const todo = [];
      const done = [];
      result.tasks.forEach(task => {
        console.log(task.status);
        if (task.status === 0) {
          todo.push(task);
        } else {
          done.push(task);
        }
      });

      setListTodo(todo);
      setListDone(done);
    });
  }, []);


  const addTask = (event) => {
    event.preventDefault();
    if (task === '') return;
    setListTodo([
      ...listTodo,
      task
    ]);
    setTask('');
  };

  return (
    <div>
      <h1 className="title">
        My TODO List
      </h1>

      <p className="description">
        Everything you need to remember
      </p>

      <form className="input">
        <input
          type="text"
          name="task"
          onChange={handleChange}
          value={task}
          placeholder='Write your assignment here!'
        />
        <button type="submit" onClick={addTask}>+</button>
      </form>
      <div className="grid">
        <List title="Tasks To Do" listItens={listTodo} />
        <List title="Tasks Done" listItens={listDone} />
      </div>

      <footer className="footer">
        <p>2022</p>
      </footer>
    </div>
  )
}
