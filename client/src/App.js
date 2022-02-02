import React, { Component } from 'react';
import './App.css';

import service from './service';

class App extends Component {
  state = {
    response: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    const body = await service.retrieveData()
      .then(data => this.setState({ response: data }));
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>CINEMATIC</code>
          </p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Click to retrieve the test data!</strong>
          </p>
          <button type="submit">Click Here</button>
        </form>
        <p>{this.state.response}</p>
      </div>
      
    );
  }
}

export default App;