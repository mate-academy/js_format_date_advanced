'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = date.split(fromFormat[3]);
  const sortedDate = {};
  const finalArray = [];
  const yearFormat = (year) => (+year >= 30 ? `19${year}` : `20${year}`);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (fromFormat[i].startsWith('Y')) {
      sortedDate['YY'] =
        'YY'.length < formatedDate[i].length
          ? formatedDate[i].slice(2, 4)
          : formatedDate[i];

      sortedDate['YYYY'] =
        formatedDate[i].length < 'YYYY'.length
          ? yearFormat(formatedDate[i])
          : formatedDate[i];
    } else {
      sortedDate[fromFormat[i]] = formatedDate[i];
    }
  }

  toFormat.forEach((el, index) => {
    if (index !== toFormat.length - 1) {
      finalArray.push(sortedDate[el]);
    }
  });

  return finalArray.join(toFormat[3]);
}

module.exports = formatDate;
