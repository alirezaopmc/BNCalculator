import React from 'react';
//import bnApi from '../apis/bnApi';
import axios from 'axios';
import Calculator from './Calculator';

class App extends React.Component {
  state = { data: null, loading: false };

  onFormSubmit = async (term) => {
    this.setState({ loading: true });
    try {
      const res = await axios.post('http://localhost:3001/calculate', {
        exp: term,
      });
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        data: 'REQUEST FAILED',
        loading: false,
      });
    }
  };

  render() {
    const { data, loading } = this.state;

    return (
      <div>
        <Calculator result={this.state.data} onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default App;
