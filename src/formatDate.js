'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , separatorFrom] = fromFormat;

  const dateParts = date.split(separatorFrom);

  const fromFormatObj = {
    [fromFormat[0]]: dateParts[0],
    [fromFormat[1]]: dateParts[1],
    [fromFormat[2]]: dateParts[2],
  };

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const shortYearStr = fromFormatObj['YY'];
    const shortYearNumb = +shortYearStr;
    const fullYear =
      shortYearNumb < 30 ? '20' + shortYearStr : '19' + shortYearStr;

    fromFormatObj['YYYY'] = fullYear;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const fullYear = fromFormatObj['YYYY'];
    const shortYearStr = fullYear.slice(-2);

    fromFormatObj['YY'] = shortYearStr;
  }

  const [value1, value2, value3, separatorTo] = toFormat;
  const resultDate = [
    fromFormatObj[value1],
    fromFormatObj[value2],
    fromFormatObj[value3],
  ].join(separatorTo);

  return resultDate;
}

module.exports = formatDate;
