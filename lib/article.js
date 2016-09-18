'use strict';

const cheerio = require('cheerio');
const normalizeNewline = require('normalize-newline');
const condenseWhitespace = require('condense-whitespace');

const ArticleDate = require('./article-date');

class Article {
  constructor(html) {
    this.find = cheerio.load(html);
  }

  getTitle() {
    const title = this.find('h4').text();
    return normalizeNewline(condenseWhitespace(title));
  }

  getDate() {
    const dateRow = this.find('.highlight').text();
    return new ArticleDate(dateRow).getDate();
  }

  getImageLink() {
    return this.find('.timg').find('.highslide').attr('href') || '';
  }

  getAuthor() {
    const authorRow = this.find('.highlight').text();
    const parts = authorRow.split('Автор: ');

    return parts[1] || '';
  }

  getText() {
    const text = this.find('.timg').text();
    return normalizeNewline(text);
  }

  getPhotos() {
    return this.find('.highslide').map((index, element) => {
      return this.find(element).attr('href');
    }).get();
  }

  getAttachments() {
    return this.find('.attachment').map((index, element) => {
      const attachment = this.find(element).find('a');

      return {
        name: attachment.text(),
        link: attachment.attr('href')
      };
    }).get();
  }
}

module.exports = Article;
