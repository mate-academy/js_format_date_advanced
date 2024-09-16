'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const resultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const keyTo = toFormat[i];

    switch (keyTo) {
      case 'DD':
        const indexOfDay = fromFormat.indexOf('DD');

        resultDate[i] = dateParts[indexOfDay];
        break;

      case 'MM':
        const indexOfMounth = fromFormat.indexOf('MM');

        resultDate[i] = dateParts[indexOfMounth];
        break;

      case 'YYYY':
        let indexOfYear;

        if (fromFormat.indexOf('YY') >= 0) {
          indexOfYear = fromFormat.indexOf('YY');

          resultDate[i] = dateParts[indexOfYear] < 30
            ? `20${dateParts[indexOfYear]}`
            : `19${dateParts[indexOfYear]}`;
        } else {
          indexOfYear = fromFormat.indexOf('YYYY');
          resultDate[i] = dateParts[indexOfYear];
        }

        break;

      case 'YY':
        let indexOfShortYear;

        if (fromFormat.indexOf('YY') >= 0) {
          indexOfShortYear = fromFormat.indexOf('YY');
          resultDate[i] = dateParts[indexOfShortYear];
        } else {
          indexOfShortYear = fromFormat.indexOf('YYYY');
          resultDate[i] = dateParts[indexOfShortYear].slice(2);
        }
        break;
    }
  }

  return resultDate.join(separator);
}

module.exports = formatDate;
