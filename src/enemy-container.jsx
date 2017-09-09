import * as React from 'react';

import LaunchButton from './launch-button.jsx';
import EarlyWarningSystem from './early-warning-system.jsx';

import './enemy-container.css'

class EnemyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="enemy-container">
      <h2 className="enemy-name">{this.props.enemy}</h2>
      <LaunchButton enemy={this.props.enemy} />
      <EarlyWarningSystem enemy={this.props.enemy} />
    </div>;
  }
}

export default EnemyContainer;
