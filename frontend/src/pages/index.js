import React, { useState, useEffect, useRef } from 'react';
import Server from '../Connection/Server';
import List from '../Components/List';
import AddTask from '../Components/AddTask';


export default function Home() {
  const [listTodo, setListTodo] = useState([]);
  const [listDone, setListDone] = useState([]);
  const allTasks = useRef([]);

  const filterTasks = () => {
    const todo = [];
    const done = [];
    allTasks.current.forEach(task => {
      if (task.status === 0) {
        todo.push(task);
      } else {
        done.push(task);
      }
    });

    setListTodo(todo);
    setListDone(done);
  };

  useEffect(() => {
    const server = new Server();
    server.getData()
    .then(result => {
      allTasks.current = result.tasks;
      filterTasks();
    });
  }, []);


  const addTask = (task) => {
    const server = new Server();
    server.addTask(task)
      .then(result => {
        if (result.status === 200) {
          const newTask = {
            description: result.description,
            id: result.id,
            status: 0
          }
          setListTodo([
            ...listTodo,
            newTask
          ]);
          allTasks.current.push(newTask);
        } else {
          console.log(result.error);
        }
      });
  };

  const updateTask = (task) => {
    const server = new Server();
    server.updateTask(task.id, task.description, task.status)
      .then(result => {
        if (result.status === 200) {
          const index = allTasks.current.findIndex(item => item.id === task.id);
          if (index > -1) {
            allTasks.current[index] = task;
            filterTasks();
          }
        } else {
          console.log(result.error);
        }
      });
  };

  const deleteTask = (task) => {
    const server = new Server();
    server.deleteTask(task)
      .then(result => {
        if (result.status === 200) {
          const index = allTasks.current.findIndex(item => item.id === task);
          if (index > -1) {
            allTasks.current.splice(index, 1);
            filterTasks();
          }
        } else {
          console.log(result.error);
        }
      });
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
        <AddTask addTask={addTask} />
      </form>
      <div className="grid">
        <List title="Tasks To Do" updateTask={updateTask} listItens={listTodo} todo/>
        <List title="Tasks Done" updateTask={updateTask} deleteTask={deleteTask} listItens={listDone} />
      </div>

      <footer className="footer">
        <p>2022</p>
      </footer>
    </div>
  )
}
