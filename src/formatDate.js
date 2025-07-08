'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateVet = date.split(separator);
  const strVet = [];

  for (const c1 of toFormat) {
    let i;
    let present;

    switch (c1) {
      case 'YYYY':
        present = false;

        for (const c2 of fromFormat) {
          if (c1 === c2) {
            present = true;
          }
        }

        if (present) {
          for (i = 0; i < fromFormat.length; i++) {
            if (fromFormat[i] === 'YYYY') {
              break;
            }
          }

          strVet.push(dateVet[i]);
        } else {
          for (i = 0; i < fromFormat.length; i++) {
            if (fromFormat[i] === 'YY') {
              break;
            }
          }

          let yearTemp = dateVet[i];
          yearTemp = `${yearTemp[yearTemp.length - 2]}${yearTemp[yearTemp.length - 1]}`;

          if (Number.parseInt(yearTemp) < 30) {
            yearTemp = '20' + yearTemp;
          } else {
            yearTemp = '19' + yearTemp;
          }

          strVet.push(yearTemp);
        }

        break;
    case 'YY':
        present = false;

        for (const c2 of fromFormat) {
          if (c1 === c2) {
            present = true;
          }
        }

        if (present) {
          for (i = 0; i < fromFormat.length; i++) {
            if (fromFormat[i] === 'YY') {
              break;
            }
          }

          strVet.push(dateVet[i]);
        } else {
          for (i = 0; i < fromFormat.length; i++) {
            if (fromFormat[i] === 'YYYY') {
              break;
            }
          }

          let strTemp = dateVet[i];
          strTemp = strTemp[strTemp.length - 2] + strTemp[strTemp.length - 1];
          strVet.push(strTemp);
        }

        break;
    case 'MM':
      for (i = 0; i < fromFormat.length; i++) {
        if (fromFormat[i] === 'MM') {
          break;
        }
      }

      strVet.push(dateVet[i]);
      break;
    case 'DD':
      for (i = 0; i < fromFormat.length; i++) {
        if (fromFormat[i] === 'DD') {
          break;
        }
      }

      strVet.push(dateVet[i]);
      break;
    }
  }

  let newDate = strVet.join(toFormat[toFormat.length - 1]);

  return newDate;
}

module.exports = formatDate;
