
'use strict';

function formatDate(date, fromFormat, toFormat) {
  if (date.includes(fromFormat[3])) {
    const dateSplit = date.split(fromFormat[3]);
    let day = 'DD';
    let monts = 'MM';
    let year = 'YYYY';

    if (fromFormat[0] === day) {
      day = dateSplit[0];
    } else if (fromFormat[1] === day) {
      day = dateSplit[1];
    } else {
      day = dateSplit[2];
    };

    if (fromFormat[0] === monts) {
      monts = dateSplit[0];
    } else if (fromFormat[1] === monts) {
      monts = dateSplit[1];
    } else {
      monts = dateSplit[2];
    };

    if (fromFormat[0] === year) {
      year = dateSplit[0];
    } else if (fromFormat[1] === year) {
      year = dateSplit[1];
    } else {
      year = dateSplit[2];
    };

    if (toFormat[0] === 'DD') {
      toFormat[0] = day;
    } else if (toFormat[1] === 'DD') {
      toFormat[1] = day;
    } else {
      toFormat[2] = day;
    };

    if (toFormat[0] === 'MM') {
      toFormat[0] = monts;
    } else if (toFormat[1] === 'MM') {
      toFormat[1] = monts;
    } else {
      toFormat[2] = monts;
    };

    if (toFormat[0] === 'YY') {
      toFormat[0] = year.slice(2);
    } else if (toFormat[1] === 'YY') {
      toFormat[1] = year.slice(2);
    } else if (toFormat[2] === 'YY') {
      toFormat[2] = year.slice(2);
    } else if (toFormat[0] === 'YYYY') {
      toFormat[0] = year;
    } else if (toFormat[1] === 'YYYY') {
      toFormat[0] = year;
    } else if (toFormat[2] === 'YYYY') {
      toFormat[2] = year;
    }

    const finalString = toFormat.slice(0, 3).join(toFormat[3]);

    return finalString;
  };
};

module.exports = formatDate;
