'use strict';

function formatDate(date, fromFormat, toFormat) {
  const result = date.split(fromFormat[fromFormat.length - 1]);

  if (toFormat[0][0] !== fromFormat[0][0]) {
    result.reverse();
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    result[toFormat.indexOf('YY')] = result[toFormat.indexOf('YY')].slice(2);

    return result.join(toFormat[toFormat.length - 1]);
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    (result[toFormat.indexOf('YYYY')] < 30)

      ? result[toFormat.indexOf('YYYY')]
        = '20' + result[toFormat.indexOf('YYYY')]

      : result[toFormat.indexOf('YYYY')]
        = '19' + result[toFormat.indexOf('YYYY')];
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
