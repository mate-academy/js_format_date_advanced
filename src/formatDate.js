'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const TOKENS = ['YYYY','YY','MM','DD'];
  const separatorFrom = fromFormat.find(part => !TOKENS.includes(part));
  const separatorTo = toFormat.find(part => !TOKENS.includes(part));
  const splitDate = date.split(separatorFrom);
  const obj = {};
  let res = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if(fromFormat[i] === separatorFrom) {
      obj['separatorFrom'] = separatorFrom;
    } else {
      obj[fromFormat[i]] = splitDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    const part = toFormat[i];

    if (part === 'YY') {
      if (obj['YYYY']) {
        res.push(obj['YYYY'].slice(-2));
      } else if (obj['YY']) {
        res.push(obj['YY']);
      }
    } else if (part === 'YYYY') {
      if (obj['YYYY']) {
        res.push(obj['YYYY']);
      } else if (obj['YY']) {
        const num = parseInt(obj['YY'], 10);
        res.push(num < 30 ? '20' + obj['YY'] : '19' + obj['YY']);
      }
    } else if (obj[part]) {
      res.push(obj[part]);
    }
  }

  return res.join(separatorTo);
}

module.exports = formatDate;
