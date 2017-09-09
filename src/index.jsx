import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import LaunchButton from './launch-button.jsx';
import EarlyWarningSystem from './early-warning-system.jsx';

class EnemyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="enemy-container">
      <LaunchButton enemy={this.props.enemy} />
      <EarlyWarningSystem enemy={this.props.enemy} />
    </div>;
  }
}

$(() =>
ReactDOM.render(
  <EnemyContainer enemy="Josh"/>,
  document.getElementById('foo')
));
