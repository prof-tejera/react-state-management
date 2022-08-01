import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import './App.css';

const FocusInput = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};

const App = () => {
  return <FocusInput />;
};

export default App;
