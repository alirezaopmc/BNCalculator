import axios from 'axios';

//function takes array of coefficients. the index of the array is considered its degree.
async function calcIntegral(degree, coffArr, top, bottom) {
  let resultObj = {};
  let result = ``;
  let perciseResult = ``;
  coffArr.forEach((coff, deg) => {
    if (coff != 0) {
      resultObj = { ...resultObj, [deg + 1]: coff / (deg + 1) };
      result += `+${Math.ceil(coff / (deg + 1))}*(x^${deg + 1})`;
      perciseResult += `${coff / (deg + 1)}*(x^${deg + 1})`;
    }
  });

  result = result.substring(1);

  console.log(result);

  let upper = result.replace(/x/g, `${top}`);
  let lower = result.replace(/x/g, `${bottom}`);

  let definiteIntegral = await axios.post('http://localhost:3001/calculate', {
    exp: `(${upper})-(${lower})`,
  });

  // for (let [deg, coff] of Object.entries(resultObj)) {
  //   upper += +coff * power(top, deg);
  //   lower += +coff * power(bottom, deg);
  // }

  return { definiteIntegral, result, perciseResult };
}

export default calcIntegral;
