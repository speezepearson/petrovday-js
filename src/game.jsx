import * as React from 'react';

import Authenticator from './authenticator.jsx';
import EnemyContainer from './enemy-container.jsx';

import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phase: 'authenticating', enemies: null};
  }

  render() {
    var contents;
    switch (this.state.phase) {
      case 'authenticating':
        contents = <Authenticator onSuccessfulAuthentication={(enemies) => this.onSuccessfulAuthentication(enemies)}/>;
        break;
      case 'monitoring':
        contents = this.state.enemies.map((e) => <EnemyContainer key={e} enemy={e} />);
        break;
      default:
        alert('unknown phase: '+this.state.phase);
        contents = ''
    }
    return <div id='content'>{contents}</div>;
  }

  onSuccessfulAuthentication(enemies) {
    console.log('hi');
    this.setState({phase: 'monitoring', enemies: enemies});
  }
}

export default Game;
