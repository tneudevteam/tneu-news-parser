'use strict';

const cheerio = require('cheerio');
const condenseWhitespace = require('condense-whitespace');

const ArticleDate = require('./article-date');

class ArticleSnippet {
  constructor(html) {
    this.find = cheerio.load(html);
    this._allAfterHoursRegex = /([^\d\d:\d\d]*)$/;
  }

  getTitle() {
    const extractedTitle = this.find('h4').text();
    return condenseWhitespace(extractedTitle);
  }

  getDate() {
    const dateRow = this.find('.highlight').text();
    return new ArticleDate(dateRow).getDate();
  }

  getTopic() {
    const topicRow = this.find('.highlight').text();
    const extractedTopic = this._allAfterHoursRegex.exec(topicRow)[0];
    return condenseWhitespace(extractedTopic);
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
