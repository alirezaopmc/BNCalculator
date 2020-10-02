import axios from 'axios';

class Operators {
  async sum(a, b) {
    let result = await axios.post('http://localhost:3001/calculate', {
      exp: `${a}+${b}`,
      isRemainder: false,
    });
    return result.data;
  }
  async sub(a, b) {
    let result = await axios.post('http://localhost:3001/calculate', {
      exp: `${a}-${b}`,
      isRemainder: false,
    });
    return result.data;
  }
  async multiply(a, b) {
    let result = await axios.post('http://localhost:3001/calculate', {
      exp: `${a}*${b}`,
      isRemainder: false,
    });
    return result.data;
  }
  async divide(a, b) {
    let result = await axios.post('http://localhost:3001/calculate', {
      exp: `${a}/${b}`,
      isRemainder: false,
    });
    return result.data;
  }
  async power(a, b) {
    let result = await axios.post('http://localhost:3001/calculate', {
      exp: `${a}^${b}`,
      isRemainder: false,
    });
    return result.data;
  }
}

export default new Operators();
