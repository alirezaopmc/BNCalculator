import axios from 'axios';

//function takes array of coefficients. the index of the array is considered its degree.
async function calcIntegral(degree, coffArr, top, bottom) {
  let resultObj = {};
  let result = ``;
  coffArr.forEach((coff, deg) => {
    if (coff != 0) {
      resultObj = { ...resultObj, [deg + 1]: coff / (deg + 1) };
      result += `+${Math.floor(coff / (deg + 1))}*(x^${deg + 1})`;
    }
  });

  result = result.substring(1);

  console.log(result);

  let upper = result.replace(/x/g, `${top}`);
  let lower = result.replace(/x/g, `${bottom}`);

  console.log(`(${upper})-(${lower})`);

  let definiteIntegral = await axios.post('http://localhost:3001/calculate', {
    exp: `(${upper})-(${lower})`,
  });

  // for (let [deg, coff] of Object.entries(resultObj)) {
  //   upper += +coff * power(top, deg);
  //   lower += +coff * power(bottom, deg);
  // }

  return { definiteIntegral, result };
}

export default calcIntegral;
