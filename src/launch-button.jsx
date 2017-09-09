import * as React from 'react';
import $ from 'jquery';

import Countdown from './countdown.jsx';
import { missileFlightTime } from './globals.jsx';

import './launch-button.css';


class LaunchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'state': 'ready'};
  }

  render() {
    if (typeof this.state.state === 'number') {
      return <button className="launch-button launch-button--ticking"><Countdown time={this.state.state}/></button>;
    }
    return <button className={`launch-button launch-button--${this.state.state}`} onClick={(e) => this.launch()} disabled={this.state.state==='obsolete'}> &#9762; </button>
  }

  launch() {
    $.get('launch/'+this.props.enemy);
    this.setState({'state': missileFlightTime});
  }

}

export default LaunchButton;
