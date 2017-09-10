import * as React from 'react';
import $ from 'jquery';

import Countdown from './countdown.jsx';
import { missileFlightTime } from './globals.jsx';

import './launch-button.css';


class LaunchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'phase': 'ready'};
  }

  render() {
    if (typeof this.state.phase === 'number') {
      return <button className="launch-button launch-button--ticking"><Countdown time={this.state.phase}/></button>;
    }
    return <button className={`launch-button launch-button--${this.state.phase}`} onClick={(e) => this.launch()} disabled={this.state.phase==='obsolete'}> &#9762; </button>
  }

  launch() {
    $.get('launch/'+this.props.enemy);
    this.setState({'phase': missileFlightTime});
  }

}

export default LaunchButton;
