import axios from 'axios';

//function takes array of coefficients. the index of the array is considered its degree.
function calcIntegral(degree, coffArr, top, bottom) {
  let resultObj = {};
  let result = ``;
  coffArr.forEach((coff, deg) => {
    if (coff != 0) {
      resultObj = { ...resultObj, [deg + 1]: coff / (deg + 1) };
      result += `+${coff / (deg + 1)}*(x^${deg + 1})`;
    }
  });

  let definiteIntegral;

  let upper = result.replace(/x/g, top);
  let lower = result.replace(/x/g, bottom);

  let definiteIntegral = axios.post('http://localhost:3000', {
    exp: `${upper}-${lower}`,
  });

  return { definiteIntegral, result };
}

export default calcIntegral;
