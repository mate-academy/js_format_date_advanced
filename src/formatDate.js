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

  const dateArr = date.split(fromFormat[3]);
  const data = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        data.yearShorthand = dateArr[i];
        break;
      case 'YYYY':
        data.yearFullform = dateArr[i];
        break;
      case 'MM':
        data.month = dateArr[i];
        break;
      case 'DD':
        data.day = dateArr[i];
        break;
    }
  }

  if (data.yearShorthand && data.yearShorthand < 30) {
    data.shorthandChanged = '20' + `${data.yearShorthand}`;
  } else {
    data.shorthandChanged = '19' + `${data.yearShorthand}`;
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' && data.yearShorthand) {
      newDate.push(data.yearShorthand);
    }

    if (toFormat[i] === 'YYYY' && data.yearFullform) {
      newDate.push(data.yearFullform);
    }

    if (toFormat[i] === 'YYYY' && !data.yearFullform) {
      newDate.push(data.shorthandChanged);
    }

    if (toFormat[i] === 'YY' && !data.yearShorthand) {
      newDate.push(data.yearFullform.slice(2));
    }

    if (toFormat[i] === 'MM') {
      newDate.push(data.month);
    }

    if (toFormat[i] === 'DD') {
      newDate.push(data.day);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
