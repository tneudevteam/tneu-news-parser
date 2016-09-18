'use strict';

const cheerio = require('cheerio');

const ArticleDate = require('./article-date');

class ArticleSnippet {
  constructor(html) {
    this.find = cheerio.load(html);
    this._allAfterHoursRegex = /([^\d\d:\d\d]*)$/;
  }

  getTitle() {
    return this.find('h4').text().trim();
  }

  getDate() {
    const dateRow = this.find('.highlight').text();
    return new ArticleDate(dateRow).getDate();
  }

  getTopic() {
    const topicRow = this.find('.highlight').text();
    const topic = this._allAfterHoursRegex.exec(topicRow)[0];
    return topic ? topic.trim() : '';
  }

  getDescription() {
    return this.find('.timg').text().trim();
  }

  getImageLink() {
    return this.find('.timg').find('.highslide').attr('href') || '';
  }

  getReadMoreLink() {
    return this.find(`[style="text-align: right;"]`).find('a').attr('href');
  }
}

module.exports = ArticleSnippet;
