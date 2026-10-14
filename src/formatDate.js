'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [first, second, third, oldSeparator] = fromFormat;
  const dateArr = date.split(oldSeparator);

  const oldDate = {
    [first]: dateArr[0],
    [second]: dateArr[1],
    [third]: dateArr[2],
  };

  if (oldDate.YY === undefined) {
    oldDate.YY = oldDate['YYYY'].slice(-2);
  }

  if (oldDate.YYYY === undefined) {
    oldDate.YYYY =
      Number(oldDate.YY) < 30 ? `20${oldDate.YY}` : `19${oldDate.YY}`;
  }

  const [newFirst, newSecond, newThird, newSeparator] = toFormat;

  return `${oldDate[newFirst]}${newSeparator}${oldDate[newSecond]}${newSeparator}${oldDate[newThird]}`;
}

module.exports = formatDate;
