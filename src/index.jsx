import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import Game from './game.jsx';

import './index.css';

$(() =>
ReactDOM.render(
  <Game />,
  document.getElementById('foo')
));
