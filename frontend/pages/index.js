import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import List from '../components/List'
import { useState } from 'react';

export default function Home() {
  const [task, setTask] = useState('');
  const [listItens, setListItens] = useState([]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (task === '') return;
    setListItens([
      ...listItens,
      task
    ]);
    setTask('');
  };

  return (
    <div>
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Todo list to remember" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          My TODO List
        </h1>

        <p className={styles.description}>
          Everything you need to remember
        </p>

        <form className={styles.input}>
          <input
            type="text"
            name="task"
            onChange={handleChange}
            value={task}
            placeholder='Write your assignment here!'
          />
          <button type="submit" onClick={addTask}>+</button>
        </form>
        <div className={styles.grid}>
          <List title="Tasks To Do" listItens={listItens}/>
          <List title="Tasks Done" listItens={listItens}/>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>2022</p>
      </footer>
    </div>
  )
}
