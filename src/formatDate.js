'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // function convert(year) {
  // }
  const fullFormatDate = {};
  const newDate = [];
  const oldDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      fullFormatDate.YYYY = oldDate[i] < 30
        ? `20${oldDate[i]}`
        : fullFormatDate.YYYY = `19${oldDate[i]}`;
    }

    fullFormatDate[fromFormat[i]] = oldDate[i];
  }

  for (const element of toFormat) {
    switch (element) {
      case 'DD': newDate.push(fullFormatDate.DD);
        break;

      case 'MM': newDate.push(fullFormatDate.MM);
        break;

      case 'YY': newDate.push(fullFormatDate.YYYY.slice(-2));
        break;

      case 'YYYY': newDate.push(fullFormatDate.YYYY);
        break;

      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
