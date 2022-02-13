import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
	const [task, setTask] = useState('');

	const handleChange = (event) => {
    setTask(event.target.value);
  };

	const checkTask = (event) => {
		event.preventDefault();
		if (task === '') return;
		addTask(task);
		setTask('');
	};

	return (
		<>
			<input
				type="text"
				name="task"
				onChange={handleChange}
				value={task}
				placeholder='Write your assignment here!'
			/>
			<button type="submit" onClick={checkTask}>+</button>
		</>
	);
};

export default AddTask;
