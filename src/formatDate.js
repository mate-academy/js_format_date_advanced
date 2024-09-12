'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const indexesFinalFormat = {};
  const separateDate = date.split(fromFormat[3]);
  const separate = toFormat[toFormat.length - 1];
  const res = [];

  toFormat.forEach((t, i) => {
    if (t.startsWith('D')) {
      indexesFinalFormat.day = i;
    }

    if (t.startsWith('M')) {
      indexesFinalFormat.month = i;
    }

    if (t.startsWith('Y')) {
      indexesFinalFormat.year = i;
      indexesFinalFormat.yearLength = t.length;
    }
  });

  fromFormat.forEach((f, index) => {
    if (f.startsWith('D')) {
      res[indexesFinalFormat.day] = separateDate[index];
    }

    if (f.startsWith('M')) {
      res[indexesFinalFormat.month] = separateDate[index];
    }

    if (f.startsWith('Y')) {
      if (f.length === indexesFinalFormat.yearLength) {
        res[indexesFinalFormat.year] = separateDate[index];
      }

      if (f.length > indexesFinalFormat.yearLength) {
        res[indexesFinalFormat.year] = separateDate[index].slice(2);
      }

      if (f.length < indexesFinalFormat.yearLength) {
        if (+separateDate[indexesFinalFormat.year] >= 30) {
          res[indexesFinalFormat.year] = '19' + separateDate[index];
        } else {
          res[indexesFinalFormat.year] = '20' + separateDate[index];
        }
      }
    }
  });

  return res.join(separate);
}

module.exports = formatDate;
