import React from 'react';
import logo from './logo.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="App-header" style={{ textAlign: 'center' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to <b>Rablabla</b></h1>
      </header>
    );
  }
}
