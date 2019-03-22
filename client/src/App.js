import React, { Component } from 'react';
import './App.css';

import service from './service';

class App extends Component {
  state = {
    response: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    service.heartbeat()
      .then(res => this.setState({ response: res.body }))
      .catch(err => console.log(err));
  };

  handleSubmit = async e => {
    e.preventDefault();
    const body = await service.createUser(this.state.username);
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>{this.state.response.name} {this.state.response.version}</code>
          </p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Identify Yourself!</strong>
          </p>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
      
    );
  }
}

export default App;