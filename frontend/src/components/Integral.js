import React from 'react';
import calcIntegral from '../helpers/integral';

class Integral extends React.Component {
  state = {
    poly: null,
    deg: '',
    upper: '',
    lower: '',
    coffArr: [],
    constant: 0,
    resultState: false,
    result: '',
  };

  degChange = (e) => {
    this.setState({ deg: e.target.value });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();

    let { deg, coffArr, upper, lower, constant } = this.state;

    coffArr.unshift(constant);
    let result = await calcIntegral(deg, coffArr, upper, lower);
    console.log(result);
    this.setState({ result: result.definiteIntegral.data, resultState: true });
  };

  coffChange = (e, index) => {
    let items = [...this.state.coffArr];
    let item = { ...this.state.coffArr[index] };
    item = e.target.value;
    items[index] = item;
    this.setState({ coffArr: items });
  };

  render() {
    if (!this.state.resultState) {
      return (
        <div>
          <form onSubmit={this.onFormSubmit}>
            <div className="integral-sign">
              <div className="upper">
                <p>Upper Bound</p>
                <input
                  onChange={(e) => this.setState({ upper: e.target.value })}
                  value={this.state.upper}
                  className="upperInput"
                  type="number"
                />
                <p>Lower Bound</p>
                <input
                  onChange={(e) => this.setState({ lower: e.target.value })}
                  value={this.state.lower}
                  className="lowerInput"
                  type="number"
                />
              </div>
              <p className="integral">∫</p>
            </div>
            <div className="boxes">
              <div className="box">
                <p>Enter the polynomial's degree: </p>
                <input
                  onChange={this.degChange}
                  value={this.state.deg}
                  className="deg"
                  type="number"
                />
              </div>
              <div className={this.state.deg ? 'box' : ''}>
                <span className={this.state.deg ? '' : 'hidden'}>
                  <input
                    value={this.state.constant}
                    onChange={(e) =>
                      this.setState({ constant: e.target.value })
                    }
                    className="coff"
                  />
                  x^0+
                </span>
                {Array.from({ length: this.state.deg }).map((i, index) => (
                  <span key={index}>
                    <input
                      value={this.state.coffArr[index]}
                      onChange={(e) => this.coffChange(e, index)}
                      className="coff"
                    />
                    +x^{index + 1}
                  </span>
                ))}
              </div>
              <button type="submit" className="box">
                Calulate!
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p className="result">{this.state.result}</p>
        </div>
      );
    }
  }
}

export default Integral;
