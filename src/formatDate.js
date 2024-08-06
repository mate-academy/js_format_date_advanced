'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const INPUT_SYMBOL = fromFormat.pop();
  const OUTPUT_SYMBOL = toFormat.pop();

  const INPUT_DATE_ARRAY = date.split(INPUT_SYMBOL);

  const inputDate = {
    day: INPUT_DATE_ARRAY[fromFormat.indexOf('DD')],
    month: INPUT_DATE_ARRAY[fromFormat.indexOf('MM')],
    year:
      INPUT_DATE_ARRAY[fromFormat.indexOf('YYYY')] ||
      INPUT_DATE_ARRAY[fromFormat.indexOf('YY')],
  };

  const OUTPUT_DATE = [];

  OUTPUT_DATE[toFormat.indexOf('DD')] = inputDate.day;
  OUTPUT_DATE[toFormat.indexOf('MM')] = inputDate.month;

  const INDEX_OF_YEAR =
    toFormat.indexOf('YY') >= 0
      ? toFormat.indexOf('YY')
      : toFormat.indexOf('YYYY');

  const OUTPUT_YEAR_LENGTH = toFormat[INDEX_OF_YEAR].length;

  const INPUT_YEAR_LENGTH = inputDate.year.length;

  if (INPUT_YEAR_LENGTH < OUTPUT_YEAR_LENGTH) {
    const PREFIX = inputDate.year >= 30 ? '19' : '20';

    OUTPUT_DATE[INDEX_OF_YEAR] = PREFIX + inputDate.year;
  } else if (INPUT_YEAR_LENGTH > OUTPUT_YEAR_LENGTH) {
    OUTPUT_DATE[INDEX_OF_YEAR] = inputDate.year.slice(-2);
  } else {
    OUTPUT_DATE[INDEX_OF_YEAR] = inputDate.year;
  }

  return OUTPUT_DATE.join(OUTPUT_SYMBOL);
}

module.exports = formatDate;
