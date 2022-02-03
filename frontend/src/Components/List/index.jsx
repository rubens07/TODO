import Item from './item';

const List = ({ title, listItens }) => {
  return (
    <div className="group">
      <h3>{title}</h3>
      <hr />
      <div className="list">
        {listItens.map((task, num) => (
        <Item text={task.description} key={num} />
        ))}
      </div>
    </div>
  )
};

export default List;
