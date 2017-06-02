const moment = require('moment');

const ArticleDate = require('../../lib/article-date');

it('should return today`s date if failed to parse', () => {
  const input = 'whatever';
  const date = new ArticleDate(input).getDate();
  const isTodaysDate = moment().diff(date, 'days') === 0;

  expect(isTodaysDate).toBeTruthy();
});

it('should return date object for date string with Сьогодні', () => {
  const input = 'Дата: Сьогодні, 09:26 Новини';
  const date = new ArticleDate(input).getDate();
  const isTodaysDate = moment().diff(date, 'days') === 0;

  expect(isTodaysDate).toBeTruthy();
  expect(moment(date).hours()).toBe(9);
});

it('should return date object for date string with Вчора', () => {
  const input = 'Дата: Вчора, 09:26 Новини';
  const date = new ArticleDate(input).getDate();
  const isYesterdaysDate = moment().diff(date, 'days') === 1;

  expect(isYesterdaysDate).toBeTruthy();
});

it('should return date object for regular date string', () => {
  const input = 'Дата: 15-09-2016, 16:05 Новини';
  const date = new ArticleDate(input).getDate();

  expect(moment(date).toDate()).toEqual(new Date(2016, 8, 15, 16, 5));
});
