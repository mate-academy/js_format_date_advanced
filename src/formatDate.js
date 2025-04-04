'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separators = ['-', '/', '.', ' '];
  let separator = ''; // Will hold the detected separator in the `fromFormat`

  // Find the separator in the `fromFormat`
  for (let i = 0; i < separators.length; i++) {
    if (fromFormat.includes(separators[i])) {
      separator = separators[i];
      break;
    }
  }

  // Split the date into parts using the separator
  const dateParts = date.split(separator);
  const fromMap = {};

  // Map each part of `fromFormat` to the corresponding `date` part
  for (let i = 0; i < fromFormat.length; i++) {
    if (!separators.includes(fromFormat[i])) {
      fromMap[fromFormat[i]] = dateParts[i];
    }
  }

  const toParts = [];
  let newSeparator = ''; // Will hold the separator for the `toFormat`

  // Find the separator in the `toFormat`
  for (let i = 0; i < separators.length; i++) {
    if (toFormat.includes(separators[i])) {
      newSeparator = separators[i];
      break;
    }
  }

  // Build the output date in the `toFormat` order
  for (let i = 0; i < toFormat.length; i++) {
    const part = toFormat[i];

    if (part === 'YYYY') {
      if (fromMap['YY']) {
        // Convert from YY to YYYY
        toParts.push(
          parseInt(fromMap['YY']) < 30
            ? `20${fromMap['YY']}`
            : `19${fromMap['YY']}`,
        );
      } else {
        toParts.push(fromMap['YYYY']);
      }
    } else if (part === 'YY') {
      if (fromMap['YYYY']) {
        // Convert from YYYY to YY
        toParts.push(fromMap['YYYY'].slice(-2));
      } else {
        toParts.push(fromMap['YY']);
      }
    } else if (!separators.includes(part)) {
      // For MM, DD, or other parts, simply add them
      toParts.push(fromMap[part]);
    }
  }

  // Join the parts with the new separator
  return toParts.join(newSeparator || '-');
}

module.exports = formatDate;
