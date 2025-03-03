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
  const partitions = [];
  const fromSeparator =
    fromFormat.filter((x) => x.toLowerCase() === x.toUpperCase())[0] ?? '-';
  const toSeparator =
    toFormat.filter((x) => x.toLowerCase() === x.toUpperCase())[0] ?? '-';
  const formatA = fromFormat.filter((x) => x !== fromSeparator);
  const formatB = toFormat.filter((x) => x !== toSeparator);

  for (let i = 0; i < formatA.length; i++) {
    partitions[formatA[i].slice(0, 2)] = date.split(fromSeparator)[i];
  }

  let newFormat = '';

  for (let i = 0; i < formatB.length; i++) {
    let pDate = '';
    const part = formatB[i].slice(0, 2);

    switch (part) {
      case 'MM':
      case 'DD':
        pDate = partitions[part];
        break;
      default:
        pDate = partitions[part];

        if (formatB[i].length === 2 && partitions[part].length === 4) {
          pDate = partitions[part].slice(-2);
        }

        if (partitions[part].length === 2) {
          const yearA = +`20${partitions[part]}`;
          const yearB = +`19${partitions[part]}`;

          pDate = yearA < 2030 ? yearA.toString() : yearB.toString();
        }
        break;
    }

    newFormat +=
      i + 1 === formatB.length ? `${pDate}` : `${pDate}${toSeparator}`;
  }

  return newFormat;
}

module.exports = formatDate;
