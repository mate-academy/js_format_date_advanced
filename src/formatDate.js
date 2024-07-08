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
    let part = '';

    switch (format) {
      case 'YYYY':
        part = yearPart;
        break;
      case 'YY':
        part = yearPart.slice(-2);
        break;
      case 'MM':
        part = MM;
        break;
      case 'DD':
        part = DD;
        break;
      default:
        part = format;
    }
    newDate += part;
    newDate += dividerNew;
  });

  return newDate.split(dividerNew).slice(0, 3).join(dividerNew);
}

module.exports = formatDate;
