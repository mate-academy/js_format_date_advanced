'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[3]);
  const dateMap = {};
  const res = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      dateMap.year = splittedDate[i];
    } else if (fromFormat[i].includes('M')) {
      dateMap.month = splittedDate[i];
    } else {
      dateMap.day = splittedDate[i];
    }
  }

  for (const el of toFormat.slice(0, fromFormat.length - 1)) {
    if (el.includes('Y')) {
      pushDate(res, dateMap, 'year', el);
    } else if (el.includes('M')) {
      pushDate(res, dateMap, 'month', el);
    } else {
      pushDate(res, dateMap, 'day', el);
    }
  }

  return res.join(toFormat[3]);
}

function pushDate(res, dateMap, key, el) {
  if (el.length === 4 && dateMap[key].length === 2) {
    if (Number(dateMap[key]) < 30) {
      res.push(20 + dateMap[key]);
    } else {
      res.push(19 + dateMap[key]);
    }
  } else if (el.length === 4 && dateMap[key].length === 4) {
    res.push(dateMap[key]);
  } else {
    res.push(dateMap[key].slice(-2));
  }
}

module.exports = formatDate;
