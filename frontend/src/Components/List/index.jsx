import Item from './item';

const List = ({ title, listItens, todo }) => {
  return (
    <div className="group">
      <h3>{title}</h3>
      <hr />
      <div>
        {listItens.map(task => (
        <Item text={task.description} key={task.id} todo={todo} />
        ))}
      </div>
    </div>
  )
};

export default List;
