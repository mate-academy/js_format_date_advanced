'use strict';

function formatDate(date, fromFormat, toFormat) {
  const [, , , separator] = fromFormat;
  const [, , , finalSeparator] = toFormat;

  const inputDate = date.split(separator);

  let yearFrom;
  let monthFrom;
  let dayFrom;

  let dayTo;
  let monthTo;
  let yearTo;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        yearFrom = i;
        break;

      case 'YY':
        yearFrom = i;
        break;

      case 'MM':
        monthFrom = i;
        break;

      case 'DD':
        dayFrom = i;
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        yearTo = i;
        break;

      case 'YY':
        yearTo = i;
        break;

      case 'MM':
        monthTo = i;
        break;

      case 'DD':
        dayTo = i;
        break;
    }
  }

  const finalDate = [];

  if (fromFormat[yearFrom].length > toFormat[yearTo].length) {
    inputDate[yearFrom] = inputDate[yearFrom].slice(2, 4);
  }

  if (toFormat[yearTo].length > fromFormat[yearFrom].length) {
    if (+inputDate[yearFrom] > 22) {
      inputDate[yearFrom] = '19' + inputDate[yearFrom];
    } else {
      inputDate[yearFrom] = '20' + inputDate[yearFrom];
    }
  }

  finalDate[yearTo] = inputDate[yearFrom];
  finalDate[monthTo] = inputDate[monthFrom];
  finalDate[dayTo] = inputDate[dayFrom];

  return finalDate.join(finalSeparator);
}

module.exports = formatDate;
