'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const datesData = dateFromFormat(date, fromFormat);
  const formatedDate = [];
  const toSeparator = toFormat[toFormat.length - 1];

  for (const part of toFormat) {
    if (part === 'YYYY') {
      formatedDate.push(datesData.fullYear);
    }

    if (part === 'YY') {
      formatedDate.push(datesData.shortYear);
    }

    if (part === 'MM') {
      formatedDate.push(datesData.month);
    }

    if (part === 'DD') {
      formatedDate.push(datesData.day);
    }
  }

  return formatedDate.join(toSeparator);
}

function dateFromFormat(date, fromFormat) {
  const datesData = {};
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dates = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length; i++) {
    const format = fromFormat[i];

    switch (true) {
      case format.includes('YYYY'):
        datesData.fullYear = dates[i];
        datesData.shortYear = dates[i].slice(-2);
        break;

      case format.includes('YY'):
        datesData.fullYear = +dates[i] < 30 ? `20${dates[i]}` : `19${dates[i]}`;
        datesData.shortYear = dates[i];
        break;

      case format.includes('DD'):
        datesData.day = dates[i];
        break;

      case format.includes('MM'):
        datesData.month = dates[i];
        break;
    }
  }

  return datesData;
}

module.exports = formatDate;
