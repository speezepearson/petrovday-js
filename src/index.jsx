import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import Game from './game.jsx';
import playExplosion from './explosion.jsx'

import './index.css';

$(() =>
ReactDOM.render(
  <Game playExplosion={playExplosion} ref={(g) => {window.game = g}} />,
  document.getElementById('foo')
));
