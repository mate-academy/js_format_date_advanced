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
  // splitting the provided date into three distinct pieces, with each piece
  // representing either MM, DD or YYYY, and we are splitting the date based
  // on the provided separator contained in fromFormat[3]
  const datePieces = date.split(fromFormat[3]);
  const yearIndices = []; // used to store the indices where 'YY'/'YYYY' occurs

  // iterating through "fromFormat[]" in order to determine the specific index
  // in the array where the year portion of the date occurs, so we can then
  // store its contents into a string and make comparisons easier
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      yearIndices.push(i);
    }
  }

  // iterating through "toFormat[]" in order to determine the specific index
  // in the array where the year portion of the date occurs, so we can then
  // store its contents into a string and make comparisons easier
  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      yearIndices.push(i);
    }
  }

  // go ahead and obtain both of the year portions from the "fromFormat[]" and
  // the "toFormat[]" arrays so we can then compare the length of their strings
  const firstYearString = fromFormat[yearIndices[0]];
  const secondYearString = toFormat[yearIndices[1]];

  // go ahead and obtain the actual year that was given to us from the "date"
  // string so we know what we are going to change about it, depending on the
  // comparisons between "firstYearString" and "secondYearString"
  const year = datePieces[yearIndices[0]];
  let newYearFormat = '';

  /*
  after obtaining the two strings that represent how many digits the year will
  be in length from "fromFormat[]" and "toFormat[]", we are going to check if we
  are not converting in either case of 'YY' or 'YYYY', converting from 'YY' to
  'YYYY' or from 'YYYY' to 'YY'. these are the steps for each of the cases:

  1. no conversions between 'YY' and 'YY' or 'YYYY' and 'YYYY'. for this case,
  the current format of the year does not need to be changed, so we go ahead and
  assign the value of "year" to "newYearFormat"

  2. converting from 'YY' to 'YYYY'. for this case, we will be checking if the
  integer value of 'year' is less than 30, and if this is true, we go ahead and
  append '20' to the string value of 'year' and assign the overall string to
  "newYearFormat". otherwise, we go ahead and append '19' to the string value of
  'year' and assign the overall string to "newYearFormat"

  3. converting from 'YYYY' to 'YY'. for this case, we know that 'year' will be
  4 characters in length, as the "fromFormat[]" array will contain 'YYYY' and we
  will be converting to 'YY', so this means that when using "datePieces[]" to
  obtain the "fromFormat[]" version of the year, we can go ahead and access its
  last two indices and store those characters into "newYearFormat"
  */
  if (firstYearString.length === secondYearString.length) {
    newYearFormat = year;
  } else if (firstYearString.length < secondYearString.length) {
    if (parseInt(year) < 30) {
      newYearFormat = '20' + year;
    } else {
      newYearFormat = '19' + year;
    }
  } else {
    newYearFormat = year[2] + year[3];
  }

  /*
  now that we have the updated format for the year, we can go ahead and go into
  "datePieces[]" using the index of where the year substring occurs in the
  "fromFormat[]" array and change the old format for the year to the new format.
  after that, we can make our lives easier by going into both "fromFormat[]" and
  "toFormat[]" and change their representations of the years to both be 'YYYY',
  as this will make the formatted date construction much easier
  */
  datePieces[yearIndices[0]] = newYearFormat;
  fromFormat[yearIndices[0]] = 'YYYY';
  toFormat[yearIndices[1]] = 'YYYY';

  /*
  using an object to associate the date portions of the given "date" string with
  their actual given numeric values. for example, if we are given our initial
  date format of ['MM', 'DD', 'YYYY', '-'] with the date string of "12-21-2000",
  we then want 'MM' to be associated with 12, 'DD' to be associated with 21 and
  'YYYY' to be associated with 2000, so then it is much easier to go into the
  "toFormat[]" with any possible possible ordering of date pieces and we will
  have the actual numeric values appear in their correct spots
  */
  const datePiecesValues = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    datePiecesValues[fromFormat[i]] = datePieces[i];
  }

  /*
  iterating through "toFormat[]" and taking the current date piece in
  toFormat[i] and looking up that specific piece's associated numeric
  value in the "datePiecesValues{}" object, so then we know what portion
  of the date will go in the current spot of "formattedDate". we check if
  we are NOT at the end of "toFormat[]" and append the current date piece
  to the specified separator contained in toFormat[3] and then append both
  to the current contents of "formattedDate". otherwise, we go ahead and
  append only the current date piece to the current contents of "formattedDate"
  as we are now at the end of the overall date
  */
  let formattedDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i !== toFormat.length - 2) {
      formattedDate += datePiecesValues[toFormat[i]] + toFormat[3];
    } else {
      formattedDate += datePiecesValues[toFormat[i]];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
