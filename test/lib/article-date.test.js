const expect = require('chai').expect;
const moment = require('moment');

const ArticleDate = require('../../lib/article-date');

describe('News Parser', function() {
  describe('Article Date Parser', function() {
    it('should return today`s date if failed to parse', function() {
      const input = 'whatever';
      const date = new ArticleDate(input).getDate();
      const isTodaysDate = moment().diff(date, 'days') === 0;

      expect(isTodaysDate).to.be.true;
    });

    it('should return date object for date string with Сьогодні', function() {
      const input = 'Дата: Сьогодні, 09:26 Новини';
      const date = new ArticleDate(input).getDate();
      const isTodaysDate = moment().diff(date, 'days') === 0;

      expect(isTodaysDate).to.be.true;
      expect(moment(date).hours()).to.equal(9);
    });

    it('should return date object for date string with Вчора', function() {
      const input = 'Дата: Вчора, 09:26 Новини';
      const date = new ArticleDate(input).getDate();
      const isYesterdaysDate = moment().diff(date, 'days') === 1;

      expect(isYesterdaysDate).to.be.true;
    });

    it('should return date object for regular date string', function() {
      const input = 'Дата: 15-09-2016, 16:05 Новини';
      const date = new ArticleDate(input).getDate();

      expect(moment(date).toDate()).to.deep.equal(new Date(2016, 8, 15, 16, 5));
    });
  });
});
