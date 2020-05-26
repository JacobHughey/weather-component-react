import React, { Component } from 'react'
import Today from './Today.js'
import Container from 'react-bootstrap/Container'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Container fluid="sm">
          <Today />
        </Container>
      </div>
    );
  }
}

export default App;
