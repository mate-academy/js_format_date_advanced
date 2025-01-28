'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , spliter] = fromFormat;
  const [, , , joiner] = toFormat;
  const splitDate = date.split(spliter);
  const result = [];
  let createYear = '';

  for (const item of toFormat) {
    for (let i = 0; i <= fromFormat.length - 2; i++) {
      if (item === fromFormat[i]) {
        result.push(splitDate[i]);
        continue;
      }

      if (item === 'YYYY' && fromFormat[i] === 'YY') {
        if (+splitDate[i] < 30) {
          createYear = '20' + splitDate[i];
          result.push(createYear);
          continue;
        }

        createYear = '19' + splitDate[i];
        result.push(createYear);
        continue;
      }

      if (item === 'YY' && fromFormat[i] === 'YYYY') {
        result.push(splitDate[i].split('').slice(2).join(''));
      }
    }
  }

  return result.join(joiner);
}

module.exports = formatDate;
