// Notes on previous weekly assignment

// Here the input is managing its state internally. App has no way
// of knowing what the value of the input is. We have taken over the browser
// from managing state, but this component is rather useless as is
class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.state.value}
          onChange={e => {
            this.setState({
              value: e.target.value,
            });
          }}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    // How can I read the username and password values?
    console.log('username?');
    return (
      <div>
        <Input label="username" />
      </div>
    );
  }
}

// Now we have taken over the browser but App has also taken
// over state management of the Input too. The flow goes:
// - App tells the input that its current value is '' and passes an onChange
//   function that the input should call whenever it needs to change
// - The user types a character, 'a' into the input
// - Input calls onChange with the new value 'a'
// - App gets notified of this new value and updates the state
// - When App updates the state, it re-renders, and passes the new values to the Input
// - Input receives the new value and re-renders itself with 'a'
class Input extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.props.value}
          onChange={e => {
            this.props.onChange(e.target.value);
          }}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  render() {
    // Now we have full control because we're managing state up here
    console.log('username', this.state.username);
    return (
      <div>
        <Input label="username" onChange={username => this.setState({ username })} />
      </div>
    );
  }
}

// How setState works
class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };
  }

  handleClick = () => {
    console.log('Before calling setState', this.state.count);

    // We call setState, which is async
    this.setState({
      count: this.state.count + 1,
    });

    // State is not updated still!
    console.log('After calling setState', this.state.count);
  };

  render() {
    return (
      <div>
        <div>Count {this.state.count}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

// Timers
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 100,
    };
  }
  render() {
    var { count } = this.state;
    const start = () => {
      this.setState({
        interval: setInterval(tick, 1000),
      });
    };
    const tick = () => {
      console.log('count ' + count);
      console.log('this.state.count ' + this.state.count);
      this.setState({
        count: this.state.count - 1,
      });
    };
    return (
      <div>
        <button label="start" onClick={start}>
          Start
        </button>
      </div>
    );
  }
}

class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };
  }

  handleClick = () => {
    console.log('Before calling setState', this.state.count);

    // We call setState, which is async
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        // State is NOW updated
        console.log('After calling setState', this.state.count);
      },
    );
  };

  render() {
    return (
      <div>
        <div>Count {this.state.count}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

/*
document.querySelectorAll('input');
*/

// So far we've defined components as classes because
// they're easier to understand, but they can be highly simplified
// A component could be thought of as a function that receives arguments (props)
// and does things internally. So you can actually write it as a function:

// #1
class MyComponent extends React.Component {
  render() {
    return <div>hello {this.props.name}</div>;
  }
}

const MyComponent = ({ name }) => {
  return <div>hello {name}</div>;
};

// #2
// Remember props cannot be re-assigned, and functional components emphasize
// this because React functional components are pure functions and always
// return the same value for the same input
const MyComponent = ({ name }) => {
  name = 'rename'; // this is not allowed

  return <div>hello {name}</div>;
};

// #3
// Hooks
// - Functional components have been around for a while, but they weren't too
// popular because you couldn't do much (state, lifecycle, etc). But then hooks
// were introduced.
// - These allow additional functionality into functional components
// - allow you to reuse stateful logic without changing your component hierarchy
// - avoid using this
// - classes don't minify well
// - they work side by side so adoption can be gradual
// - Hooks are functions that let you “hook into” React state and lifecycle features from function components.

// useState
// - returns a pair -> current value and setter
// - does not merge old and new state since it just updates one value
//
const Counter = () => {
  const [counter, setCounter] = useState(0);
  return <div onClick={() => setCounter(count + 1)}>Counter {counter}</div>;
};

// Compare to the class version:
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div
        onClick={() =>
          this.setState(prevState => ({
            counter: prevState.counter + 1,
          }))
        }
      >
        Counter {this.state.counter}
      </div>
    );
  }
}

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return <div onClick={() => setCounter(counter + 1)}>Counter {counter}</div>;
};

// #4
// Rules about hooks
// only two main ones:
// - only at the top level (not inside conditions, loops, etc)
// - only in functional components (or custom hooks)
const Invalid = ({ type }) => {
  if (type === 'number') {
    const [value, setValue] = useState(0);
  } else {
    const [value, setValue] = useState('');
  }

  return <div>Nope</div>;
};

// #5
// Effect Hook
// any data fetching, subscriptions, or manually changing the DOM from React components
// is called a side-effect, because they can affect other components and can’t be done during rendering
// - replaces componentDidMount, componentDidUpdate, and componentWillUnmount
// - runs your “effect” function after flushing changes to the DOM (componentDidUpdate) - runs after every render including the first render
const Counter = () => {
  const [counter, setCounter] = useState(0);

  const componentDidUpdate = () => {
    console.log('run update', counter);
  };

  useEffect(componentDidUpdate);

  return <div>Counter {counter}</div>;
};

// less verbose syntax:
const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('run update', counter);
  });

  return <div>Counter {counter}</div>;
};

// clean up (componentDidUnmount) - by returning a function
// from useEffect, we can run any clean up we need
const Even = ({ number }) => {
  useEffect(() => {
    console.log('updated Even');
    return () => {
      console.log('unmounted Even');
    };
  });

  return `Even ${number}`;
};

const Odd = ({ number }) => {
  useEffect(() => {
    console.log('updated Odd');
    return () => {
      console.log('unmounted Odd');
    };
  });

  return `Odd ${number}`;
};

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Inc</button>
      {counter % 2 ? <Odd number={counter} /> : <Even number={counter} />}
    </div>
  );
};

// Customizing when useEffect gets called
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('username changed', username);
  }, [username]);

  useEffect(() => {
    console.log('password changed', password);
  }, [password]);

  return (
    <div>
      <input onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      <input onChange={e => setPassword(e.target.value)} value={password} placeholder="password" type="password" />
    </div>
  );
};

// So that means that we can have a useEffect that runs once, and never again...
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // componentDidMount
  useEffect(() => {
    console.log('Runs on mount but never again');
  }, []);

  useEffect(() => {
    console.log('username changed', username);
  }, [username]);

  useEffect(() => {
    console.log('password changed', password);
  }, [password]);

  return (
    <div>
      <input onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      <input onChange={e => setPassword(e.target.value)} value={password} placeholder="password" type="password" />
    </div>
  );
};

// Tricky intervals ->
const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('running useEffect');
    const interval = setInterval(() => {
      console.log('counter', counter);
      setCounter(counter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Counter {counter}</div>;
};

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('counter', counter);
      setCounter(counter + 1);
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [counter]);

  return <div>Counter {counter}</div>;
};
