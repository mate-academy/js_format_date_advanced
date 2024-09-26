'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let resultDate = [];

  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateComponents = date.split(fromSeparator);

  for (let i = 0; i < toFormat.length; i++) {
    const formatToken = toFormat[i];

    switch (formatToken) {
      case 'DD':
        resultDate.push(dateComponents[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        resultDate.push(dateComponents[fromFormat.indexOf('MM')]);
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YYYY')]);
        } else if (fromFormat.includes('YY')) {
          const year2Digits = dateComponents[fromFormat.indexOf('YY')];

          if (year2Digits.length === 2) {
            if (year2Digits < '30') {
              resultDate.push(`20${year2Digits}`);
            } else {
              resultDate.push(`19${year2Digits}`);
            }
          } else {
            resultDate.push(year2Digits);
          }
        }
        break;

      case 'YY':
        if (fromFormat.includes('YYYY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YYYY')].slice(-2));
        } else if (fromFormat.includes('YY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YY')]);
        }
        break;
    }
  }
  resultDate = resultDate.join(toSeparator);

  return resultDate;
}

module.exports = formatDate;
