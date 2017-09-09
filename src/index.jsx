import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EnemyContainer from './enemy-container.jsx';

import './index.css';

$(() =>
ReactDOM.render(
  <EnemyContainer enemy='Josh' />,
  document.getElementById('foo')
));
