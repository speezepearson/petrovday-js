import * as React from 'react';
import Countdown from './countdown.jsx';
import { missileFlightTime } from './globals.jsx';


class LaunchButton extends React.Component {
  constructor(props, state) {
    super(props);
    this.state = {'state': state};
  }

  render() {
    if (typeof this.state.state === 'number') {
      return <button className="launch-button launch-button--ticking"><Countdown time={this.state.state}/></button>;
    }
    console.log('rendering', this, 'hi');
    return <button className="launch-button launch-button--{this.state}" onClick={(e) => this.launch()} disabled={this.state.state==='obsolete'}> &#9762; </button>
  }

  launch() {
    $.get('launch/'+this.props.enemy);
    this.setState({'state': missileFlightTime});
  }

}

export default LaunchButton;
