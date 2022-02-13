import Item from './item';

const List = (props) => {
  const {
    title,
    listItens,
    todo,
    updateTask,
    deleteTask
  } = props
  
  return (
    <div className="group">
      <h3>{title}</h3>
      <hr />
      <div>
        {listItens.map(task => (
          <Item
            text={task.description}
            key={task.id}
            taskId={task.id}
            todo={todo}
            updateTask={updateTask}
            deleteTask={deleteTask}
            status={task.status}
          />
        ))}
      </div>
    </div>
  )
};

export default List;
