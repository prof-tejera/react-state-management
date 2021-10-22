import { useEffect } from 'react';

// How setState works
class StateTest extends React.Component {
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
      <div className="main-panel">
        <div className="display">Count {this.state.count}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

class StateTest extends React.Component {
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
      <div className="main-panel">
        <div className="display">Count {this.state.count}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const App = () => {
  return <StateTest />;
};

// Timers
// the tick function is not redefined every render, so the value of `count` is set
// to the first time its defined. However, this.state.count is a reference to the current value
class TrickyTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 100,
    };
  }

  render() {
    const { count, interval } = this.state;

    const tick = () => {
      console.log('count ' + count);
      console.log('count', count, 'this.state.count', this.state.count);
      this.setState({
        count: this.state.count - 1,
      });
    };

    const isRunning = !!interval;

    return (
      <div className="main-panel">
        <div className="display">Count {this.state.count}</div>
        <button
          style={{ backgroundColor: isRunning ? 'red' : '#3B668C' }}
          onClick={() => {
            if (interval) {
              clearInterval(interval);
              this.setState({
                interval: null,
              });
            } else {
              this.setState({
                interval: setInterval(tick, 1000),
              });
            }
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

// So far we've defined components as classes because
// they're easier to understand, but they can be highly simplified
// A component could be thought of as a function that receives arguments (props)
// and does things internally. So you can actually write it as a function:

// #1
class MyComponent extends React.Component {
  render() {
    return <div className="main-panel">hello {this.props.name}</div>;
  }
}

const MyComponent = ({ name }) => {
  return <div className="main-panel">hello {name}</div>;
};

// #2
// Remember props cannot be re-assigned
const MyComponent = ({ name }) => {
  name = 'rename'; // this is not allowed

  return <div className="main-panel">hello {name}</div>;
};

// useRef, useState

// Our version of setState
const createState = initialValue => {
  let _innerValue = initialValue;

  const setState = (newValue, after) => {
    _innerValue = {
      ..._innerValue,
      ...newValue,
    };

    if (after) {
      after();
    }
  };

  const getter = () => _innerValue;

  return {
    state: getter,
    setState,
  };
};

const App = () => {
  const { state, setState } = createState({
    counter: 1,
  });

  console.log('Initial Value', state());

  const run = () => {
    const { counter } = state();
    setState(
      {
        counter: counter + 1,
      },
      () => {
        console.log('After change', state());
      },
    );
  };

  return (
    <div>
      <button onClick={run}>setState</button>
    </div>
  );
};

// Single value state
const createState = initialValue => {
  let _innerValue = initialValue;

  const setter = newValue => {
    _innerValue = newValue;
  };

  const getter = () => _innerValue;

  return {
    getter,
    setter,
  };
};

const App = () => {
  const { getter, setter } = createState(0);

  console.log('Initial Value', getter());

  const run = () => {
    setter(getter() + 1);
    console.log('After change', getter());
  };

  return (
    <div>
      <button onClick={run}>setState</button>
    </div>
  );
};

const createState = initialValue => {
  let _innerValue = initialValue;

  const setter = newValue => {
    _innerValue = newValue;
  };

  const getter = () => _innerValue;

  return [getter, setter];
};

// Multiple values
const App = () => {
  const [getter1, setter1] = createState(0);
  const [getter2, setter2] = createState(0);

  const logState = () => {
    console.log('State 1', getter1(), 'State 2', getter2());
  };

  const run1 = () => {
    setter1(getter1() + 1);
    logState();
  };

  const run2 = () => {
    setter2(getter2() + 1);
    logState();
  };

  logState();

  return (
    <div>
      <button onClick={run1}>Inc1</button>
      <button onClick={run2}>Inc2</button>
    </div>
  );
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

  return (
    <div className="main-panel">
      <div className="display">Counter {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

// less verbose syntax:
const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('run update', counter);
  });

  return (
    <div className="main-panel">
      <div className="display">Counter {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
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
    <div className="main-panel">
      <div className="display">{counter % 2 ? <Odd number={counter} /> : <Even number={counter} />}</div>
      <button onClick={() => setCounter(counter + 1)}>Inc</button>
    </div>
  );
};

// When does the clean up execute? before the next effect runs
const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('run update', counter);

    return () => {
      console.log('run cleanup', counter);
    };
  });

  return (
    <div className="main-panel">
      <div className="display">Counter {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

// Customizing when useEffect gets called
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(`%cchanged username to ${username}`, 'color: green;');

    return () => {
      console.log(`%cclean up username ${username}`, 'color: white; background: green;');
    };
  }, [username]);

  useEffect(() => {
    console.log(`%cchanged password to ${password}`, 'color: red;');

    return () => {
      console.log(`%cclean up password ${password}`, 'color: white; background: red;');
    };
  }, [password]);

  return (
    <>
      <div>
        <input onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      </div>
      <div>
        <input onChange={e => setPassword(e.target.value)} value={password} placeholder="password" type="password" />
      </div>
    </>
  );
};

const App = () => {
  const [mounted, setMounted] = useState(true);

  return (
    <div className="main-panel">
      {mounted && <LoginForm />}
      <button onClick={() => setMounted(!mounted)}>Toggle</button>
    </div>
  );
};

// So that means that we can have a useEffect that runs once, and never again...
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('Runs on mount but never again');

    return () => {
      console.log('Clean up only on unmount (componentDidUnmount)');
    };
  }, []);

  useEffect(() => {
    console.log(`%cchanged username to ${username}`, 'color: green;');

    return () => {
      console.log(`%cclean up username ${username}`, 'color: white; background: green;');
    };
  }, [username]);

  useEffect(() => {
    console.log(`%cchanged password to ${password}`, 'color: red;');

    return () => {
      console.log(`%cclean up password ${password}`, 'color: white; background: red;');
    };
  }, [password]);

  return (
    <>
      <div>
        <input onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      </div>
      <div>
        <input onChange={e => setPassword(e.target.value)} value={password} placeholder="password" type="password" />
      </div>
    </>
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
      console.log('clearing interval');
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="main-panel">
      <div className="display">Counter {counter}</div>
    </div>
  );
};

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('counter', counter);
      setCounter(counter + 1);
    }, 1000);

    return () => {
      console.log('clearing timeout');
      clearTimeout(timeout);
    };
  }, [counter]);

  return (
    <div className="main-panel">
      <div className="display">Counter {counter}</div>
    </div>
  );
};

// local variables get reset after each re-render!
const Counter = () => {
  const [stateCounter, setStateCounter] = useState(0);
  let varCounter = 0;

  console.log('In Render - stateCounter', stateCounter, 'varCounter', varCounter);

  return (
    <div>
      <div className="main-panel">
        <div className="display">State Counter: {stateCounter}</div>
        <button
          onClick={() => {
            console.log('Before setting - stateCounter', stateCounter);
            setStateCounter(stateCounter + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="main-panel">
        <div className="display">Var Counter: {varCounter}</div>
        <button
          onClick={() => {
            console.log('Before setting - varCounter', varCounter);
            varCounter++;
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

const Counter = () => {
  const [stateCounter, setStateCounter] = useState(0);
  const varCounter = useRef(0);

  console.log('In Render - stateCounter', stateCounter, 'varCounter', varCounter.current);

  return (
    <div>
      <div className="main-panel">
        <div className="display">State Counter: {stateCounter}</div>
        <button
          onClick={() => {
            console.log('Before setting - stateCounter', stateCounter);
            setStateCounter(stateCounter + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="main-panel">
        <div className="display">Var Counter: {varCounter.current}</div>
        <button
          onClick={() => {
            console.log('Before setting - varCounter', varCounter.current);
            varCounter.current = varCounter.current + 1;
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// useRef for DOM references
class MapClass extends React.Component {
  constructor() {
    super();
    this.myMap = React.createRef();
  }

  componentDidMount() {
    new mapboxgl.Map({
      container: this.myMap.current,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-71.1167, 42.377], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }

  render() {
    return (
      <div className="main-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div ref={this.myMap} style={{ height: 300, width: 300, margin: 0 }} />
      </div>
    );
  }
}

const MapFunctional = () => {
  const myMap = useRef();

  useEffect(() => {
    new mapboxgl.Map({
      container: myMap.current,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-71.1167, 42.377], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }, []);

  return (
    <div
      className="main-panel"
      ref={myMap}
      style={{ height: 300, width: 300, padding: 0, margin: 0, overflow: 'hidden' }}
    />
  );
};

const App = () => {
  return (
    <div>
      <h2>Class</h2>
      <MapClass />
      <h2>Functional</h2>
      <MapFunctional />
    </div>
  );
};
