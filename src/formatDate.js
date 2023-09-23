/**
 * Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array, and the new `toFormat` array. Function returns
 * the given date in the new format.
 * The function can change a separator, reorder the date parts or convert a
 * year from 4 digits to 2 digits and back.
 * When converting from YYYY to YY, just use the last 2 digits (1997 -> 97).
 * When converting from YY to YYYY, use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.']
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.']
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/']
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.']
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.']
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultDate = [];
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const slicedFormat = toFormat.slice(0, 3);

  for (let i = 0; i < slicedFormat.length; i++) {
    const formatPart = toFormat[i];
    let prop = formatPart;

    if (formatPart === 'YYYY') {
      prop = 'YY';
    }

    const fromIndex = fromFormat.findIndex((value) => value.includes(prop));
    let newProp = dateParts[fromIndex];

    if (formatPart === 'YYYY' && newProp.length === 2) {
      if (newProp < 30) {
        newProp = `20${newProp}`;
      } else {
        newProp = `19${newProp}`;
      }
    }

    if (formatPart === 'YY' && newProp.length === 4) {
      newProp = newProp.slice(2);
    }

    resultDate.push(newProp);
  }

  return resultDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
