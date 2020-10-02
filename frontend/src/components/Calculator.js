import React from 'react';
import axios from 'axios';
import Spinner from './Spinner';
const { ipcRenderer } = window.require('electron');

class Calculator extends React.Component {
  state = { term: '', resultState: false, loading: false };

  constructor(props) {
    super(props);
    this.InputRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.loading) {
      document.getElementById('times').addEventListener('click', function (e) {
        ipcRenderer.send('close-me');
      });

      document.getElementById('minus').addEventListener('click', function (e) {
        ipcRenderer.send('minimize-me');
      });

      window.addEventListener('keydown', (e) => {
        const num = this.InputRef.current;

        if (
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105) ||
          e.keyCode === 106 ||
          e.keyCode === 107 ||
          e.keyCode === 109 ||
          e.keyCode === 111
        ) {
          if (this.state.resultState === true) {
            this.setState({ term: '', resultState: false });
          }
          num.value += e.key;

          this.setState({ term: num.value });
        }

        if (e.keyCode === 13) {
          this.onFormSubmit(e);
        }

        if (e.keyCode === 8) {
          if (this.state.resultState === true) {
            this.setState({ term: '', resultState: false });
          }

          num.value = num.value.substring(0, num.value.length - 1);
          this.setState({ term: num.value });
        }
      });
    }
  }

  onInputChange = (e) => {
    this.setState({ term: e.target.value });
  };

  onButtonClick = (e) => {
    console.log(this.state.resultState);
    if (this.state.resultState === true) {
      this.InputRef.current.value = '';
      this.setState({ term: '', resultState: false });
    }
    this.InputRef.current.value += e.target.innerText;
    this.setState({ term: this.InputRef.current.value });
  };

  onCeClick = (e) => {
    this.InputRef.current.value = '';
    this.setState({ term: '' });
  };

  openIntegralWindow(e) {
    ipcRenderer.send('openIntegralWindow');
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let isRemainder = false;
    const term = this.state.term;
    if (term.length - term.replace(/[/]+/g, '').length === 1) {
      isRemainder = true;
    }
    await this.sendtoApi(this.state.term, isRemainder);
    this.setState({ loading: false });
  };

  sendtoApi = async (term, isRemainder) => {
    try {
      const res = await axios.post('http://localhost:3001/calculate', {
        exp: term,
        isRemainder,
      });
      this.setState({
        term: res.data,
        resultState: true,
      });
    } catch (error) {
      this.setState({
        term: 'REQUEST FAILED',
      });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <div className="container">
            <div className="header">
              <div className="frame-control">
                <button id="minus">&minus;</button>
                <button id="times">&times;</button>
              </div>
            </div>
            <form onSubmit={this.onFormSubmit}>
              <div className="num-container">
                <div className="num-box">
                  <div className="left">
                    <button onClick={this.openIntegralWindow}>&#x222B;</button>
                    <span>Shyn co.</span>
                    <div></div>
                  </div>
                  <div className="right">
                    <Spinner message="Calculating..." />
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  7
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="divide"
                >
                  /
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  5
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="multiply"
                >
                  *
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="minus"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={this.onCeClick}
                  className="clear"
                >
                  ce
                </button>
                <button type="submit" className="equals">
                  =
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="plus"
                >
                  +
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="container">
            <div className="header">
              <div className="frame-control">
                <button id="minus">&minus;</button>
                <button id="times">&times;</button>
              </div>
            </div>
            <form onSubmit={this.onFormSubmit}>
              <div className="num-container">
                <div className="num-box">
                  <div className="left">
                    <button type="button" onClick={this.openIntegralWindow}>
                      &#x222B;
                    </button>
                    <span>Shyn co.</span>
                    <div></div>
                  </div>
                  <div className="right">
                    <textarea
                      readOnly
                      value={this.state.term}
                      style={{ resize: 'none' }}
                    ></textarea>
                    <input
                      value={this.state.term}
                      onChange={this.onInputChange}
                      style={{ resize: 'none' }}
                      ref={this.InputRef}
                      type="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  7
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="divide"
                >
                  /
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  5
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="multiply"
                >
                  *
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="minus"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="num"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={this.onCeClick}
                  className="clear"
                >
                  ce
                </button>
                <button type="submit" className="equals">
                  =
                </button>
                <button
                  type="button"
                  onClick={this.onButtonClick}
                  className="plus"
                >
                  +
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Calculator;
