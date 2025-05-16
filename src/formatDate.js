'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fFormat = [...fromFormat];
  const tFormat = [...toFormat];

  const oldSeparator = fFormat.splice(3, 1)[0];
  const newSeparator = tFormat.splice(3, 1)[0];

  const data = {};

  const dateArr = date.split(oldSeparator);

  for (let i = 0; i < fFormat.length; i++) {
    data[fFormat[i][0]] = dateArr[i];
  }

  const newDate = tFormat.map((el) => {
    const val = String(data[el[0]]);

    if (el.length > val.length) {
      if (el[0].toLowerCase() === 'y') {
        return `${+val < 30 ? '20' : '19'}${val}`;
      }
    } else if (el.length < val.length) {
      return val.slice(-2);
    }

    return val;
  });

  return newDate.join(newSeparator);
}

module.exports = formatDate;
