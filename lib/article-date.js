'use strict';

const cheerio = require('cheerio');
const moment = require('moment');

module.exports = class ArticleDate {
  constructor(html) {
    this.find = cheerio.load(html);

    this._now = moment();
    this._allAfterHoursRegex = /([^\d\d:\d\d]*)$/;
    this._todayDateString = this._now.format('DD-MM-YYYY');
    this._yesterdayDateString = this._now.clone().subtract(1, 'days').format('DD-MM-YYYY');
  }

  getDate() {
    const dateRow = this.find.text();
    const dateString = this._cleanDateRow(dateRow);
    const parsedDate = moment(dateString, 'DD-MM-YYYY, HH:mm');

    if (parsedDate.isValid()) {
      return parsedDate.toDate();
    }

    return this._now.toDate();
  }

  _cleanDateRow(dateRow) {
    return dateRow
      .replace(this._allAfterHoursRegex, '')
      .replace('Дата: ', '')
      .replace('Сьогодні', this._todayDateString)
      .replace('Вчора', this._yesterdayDateString)
      .trim();
  }
};
