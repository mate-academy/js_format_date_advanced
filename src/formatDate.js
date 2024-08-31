/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separador = fromFormat[3];
  const separadorTo = toFormat[3];

  const newDate = date.split(separador);

  const dateObj = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObj[fromFormat[i]] = newDate[i];
  }

  const newDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const formatKey = toFormat[i];

    if (formatKey === 'YYYY' && dateObj['YY']) {
      // Converter YY para YYYY
      const year = parseInt(dateObj['YY'], 10);

      dateObj['YYYY'] = year < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
    }

    if (formatKey === 'YY' && dateObj['YYYY']) {
      // Converter YYYY para YY
      dateObj['YY'] = dateObj['YYYY'].slice(-2);
    }

    newDateParts.push(dateObj[formatKey]);
  }

  // Junta os componentes reordenados usando o separador de destino
  const formattedDate = newDateParts.join(separadorTo);

  return formattedDate;
}

module.exports = formatDate;
