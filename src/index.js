import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';

import './styles.scss';

// const initialState = {
//   result: null,
//   loading: true,
//   error: null,
// };

// const fetchReducer = (state, action) => {
//   if (action.type === 'LOADING') {
//     return {
//       result: null,
//       loading: true,
//       error: null,
//     };
//   }

//   if (action.type === 'RESPONSE_COMPLETE') {
//     return {
//       result: action.payload.response,
//       loading: false,
//       error: null,
//     };
//   }
//   if (action.type === 'ERROR') {
//     return {
//       result: null,
//       loading: false,
//       error: action.payload.error,
//     };
//   }
//   return state;
// };

const useFetch = url => {
  const [response, setResponse] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  useEffect (() => {
    setLoading (true);
    setResponse (null);
    setError (null);

    fetch (endpoint + '/characters')
      .then (response => response.json ())
      .then (response => {
        setLoading (false);
        setResponse (response);
      })
      .catch (error => {
        setLoading (false);
        setError (error);
      });
  }, []);
  return [response, loading, error];
};

const Application = () => {
  const [response, loading, error] = useFetch (endpoint + '/characters');

  const characters = (response && response.characters) || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <p>Loading</p> : <CharacterList characters={characters} />}
        </section>
        {error && <p className="error">{error}</p>}
      </main>
    </div>
  );
};

const rootElement = document.getElementById ('root');

ReactDOM.render (
  <Router>
    <Application />
  </Router>,
  rootElement
);
