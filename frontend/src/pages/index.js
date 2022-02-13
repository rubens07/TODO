import React, { useState, useEffect } from 'react';
import Server from '../Connection/Server';
import List from '../Components/List';
import AddTask from '../Components/AddTask';


export default function Home() {
  const [listTodo, setListTodo] = useState([]);
  const [listDone, setListDone] = useState([]);

  useEffect(() => {
    const server = new Server();
    server.getData()
    .then(result => {
      console.log(result);
      const todo = [];
      const done = [];
      result.tasks.forEach(task => {
        console.log(task);
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


  const addTask = (task) => {
    // TODO - pegar o texto, fazer um server.addTask, pegar o id salvo, montar o dicionário e adicionar na lista
    setListTodo([
      ...listTodo,
      task
    ]);
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
        <List title="Tasks To Do" listItens={listTodo} todo/>
        <List title="Tasks Done" listItens={listDone} />
      </div>

      <footer className="footer">
        <p>2022</p>
      </footer>
    </div>
  )
}
