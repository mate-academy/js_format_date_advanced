'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArray = date.split(oldSeparator);

  const formattedDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const currentPart = toFormat[i];
    const indexFrom = fromFormat.indexOf(currentPart);

    if (indexFrom !== -1) {
      formattedDate.push(dateArray[indexFrom]);
    } else {
      if (currentPart === 'YYYY' && fromFormat.includes('YY')) {
        const index = fromFormat.indexOf('YY');
        const year = +dateArray[index];
        const nineteenthCentury = '19';
        const twentiethCentury = '20';

        formattedDate.push(year < 30
          ? twentiethCentury + dateArray[index]
          : nineteenthCentury + dateArray[index]);
      } else {
        const index = fromFormat.indexOf('YYYY');

        formattedDate.push(dateArray[index].slice(2));
      }
    }
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
