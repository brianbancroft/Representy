import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import bar from 'config';

console.log(bar);

ReactDOM.render(<App/>,
  document.getElementById('app')  );
