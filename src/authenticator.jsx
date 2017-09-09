import * as React from 'react';
import $ from 'jquery';

import './authenticator.css';

class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: ''}
    this.passwordField = <input type="password" placeholder="Password" />;
  }

  handleChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return <div className="authenticator">
      <input type="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
      &nbsp; <button id="submit_password" onClick={() => this.authenticate()}>Log In</button>
    </div>;
  }

  authenticate(password) {
    this.props.onSuccessfulAuthentication(['Alice', 'Bob', 'Charlie']);
    // $.get('authenticate', {'password': this.state.password}, (data) => this.onSuccessfulAuthentication(JSON.parse(data)));
  }
}

export default Authenticator;
