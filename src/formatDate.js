'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const time = {
    'YYYY': 0,
    'YY': 0,
    'MM': 0,
    'DD': 0,
  };
  const dayOld = date.split(fromFormat[fromFormat.length - 1]);
  const day = [];
  const newSeparation = toFormat[toFormat.length - 1];

  let i = 0;

  for (const format of fromFormat) {
    switch (format) {
      case 'YY':
        time.YY = dayOld[i];

        if (time.YY >= 30) {
          time.YYYY = '19' + dayOld[i];
        } else {
          time.YYYY = '20' + dayOld[i];
        };
        break;

      case 'YYYY':
        time.YY = dayOld[i].slice(-2);
        time.YYYY = dayOld[i];
        break;

      case 'MM':
        time.MM = dayOld[i];
        break;

      case 'DD':
        time.DD = dayOld[i];
        break;
    };
    i++;
  };

  for (const key of toFormat) {
    if (time[key]) {
      day.push(time[key]);
    };
  };

  return day.join(newSeparation);
};

module.exports = formatDate;
