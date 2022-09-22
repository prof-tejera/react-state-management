import './App.css';

const Styles = {
  red: {
    color: 'red',
  },
  bordered: {
    border: '1px solid blue',
  },
};

const ListItem = ({ id, name, index }) => {
  return (
    <li id={id}>
      <span>
        <b>{id}</b>: {name}
      </span>
    </li>
  );
};

const ListPanel = ({ title, items }) => {
  const renderedItems = items.map((item, index) => {
    const isOdd = index % 2 === 1;

    return isOdd && <ListItem key={index} id={index} name={item.name} index={index} />;
  });

  console.log(renderedItems);

  return (
    <div>
      <h3>{title}</h3>
      <ol>{renderedItems}</ol>
    </div>
  );
};

const App = () => {
  const loggedUser = {
    name: 'Nico',
  };

  return (
    <div>
      {loggedUser && `Hello ${loggedUser.name}`}
      {!loggedUser && 'Log In'}
    </div>
  );
};

export default App;
