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
  const divider = fromFormat[3];
  const dividerNew = toFormat[3];
  const parts = date.split(divider);

  const fromFormatMap = {};

  fromFormat.forEach((format, index) => {
    fromFormatMap[format] = parts[index];
  });

  const { YYYY, YY, MM, DD } = fromFormatMap;

  let yearPart;

  if (YYYY !== undefined) {
    yearPart = YYYY;
  } else if (YY !== undefined) {
    const shortYear = parseInt(YY, 10);

    yearPart = shortYear < 30 ? `20${YY}` : `19${YY}`;
  }

  let newDate = '';

  toFormat.forEach((format) => {
    switch (format) {
      case 'YYYY':
        newDate += yearPart;
        newDate += dividerNew;

        break;
      case 'YY':
        newDate += yearPart.slice(-2);
        newDate += dividerNew;
        break;
      case 'MM':
        newDate += MM;
        newDate += toFormat[3];

        break;
      case 'DD':
        newDate += DD;
        newDate += dividerNew;

        break;
      default:
        newDate += format;
    }
  });

  return newDate.split(dividerNew).slice(0, 3).join(dividerNew);
}

module.exports = formatDate;
