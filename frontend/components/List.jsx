import styles from '../styles/Home.module.css'
import Item from './item';

const List = ({ title, listItens }) => {
  return (
    <div className={styles.group}>
      <h3>{title}</h3>
      <hr />
      <div className={styles.list}>
        <ul>
          {listItens.map((task) => (
            <Item text={task} />
          ))}
        </ul>
      </div>
    </div>
  )
};

export default List;
