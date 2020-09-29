import React from 'react';
const { ipcRenderer } = window.require('electron');

class Calculator extends React.Component {
  state = { term: '', resultState: false };

  constructor(props) {
    super(props);
    this.InputRef = React.createRef();
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    document.getElementById('times').addEventListener('click', function (e) {
      ipcRenderer.send('close-me');
    });

    document.getElementById('minus').addEventListener('click', function (e) {
      ipcRenderer.send('minimize-me');
    });

    window.addEventListener('keydown', (e) => {
      if (this.state.resultState === true) {
        this.setState({ term: '', resultState: false });
      }

      const num = this.InputRef.current;

      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.keyCode === 106 ||
        e.keyCode === 107 ||
        e.keyCode === 109 ||
        e.keyCode === 111
      ) {
        num.value += e.key;
        this.setState({ term: num.value });
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

  onInputChange = (e) => {
    this.setState({ term: e.target.value });
  };

  onButtonClick = (e) => {
    if (this.state.resultState === true) {
      this.setState({ term: '', resultState: false });
    }
    this.InputRef.current.value += e.target.innerText;
    this.setState({ term: this.InputRef.current.value });
  };

  onCeClick = (e) => {
    this.InputRef.current.value = '';
    this.setState({ term: '' });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    await this.props.onFormSubmit(this.state.term);
    this.setState({ term: this.props.result, resultState: true });
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="frame-control">
            <button id="minus">&minus;</button>
            <button id="times">&times;</button>
          </div>
          <div className="label">
            <p>Shyn</p>
          </div>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <div className="num-container">
            <div className="num-box">
              <div className="left">
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
            <button type="button" onClick={this.onButtonClick} className="num">
              7
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              8
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              9
            </button>
            <button
              type="button"
              onClick={this.onButtonClick}
              className="divide"
            >
              /
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              4
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              5
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              6
            </button>
            <button
              type="button"
              onClick={this.onButtonClick}
              className="multiply"
            >
              *
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              1
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              2
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              3
            </button>
            <button
              type="button"
              onClick={this.onButtonClick}
              className="minus"
            >
              -
            </button>
            <button type="button" onClick={this.onButtonClick} className="num">
              0
            </button>
            <button type="button" onClick={this.onCeClick} className="clear">
              ce
            </button>
            <button type="submit" className="equals">
              =
            </button>
            <button type="button" onClick={this.onButtonClick} className="plus">
              +
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Calculator;
