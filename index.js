const cheerio = require('cheerio');
const Article = require('./lib/article');
const ArticleSnippet = require('./lib/article-snippet');

/**
 * Extracts news article from page html
 * @param {String} html Article page html
 * @return {Object} Article object
 */
function parseArticle(html) {
  _validateInput(html);
  const article = new Article(html);

  return {
    title: article.getTitle(),
    date: article.getDate(),
    imageLink: article.getImageLink(),
    author: article.getAuthor(),
    text: article.getText(),
    photos: article.getPhotos(),
    attachments: article.getAttachments()
  };
}

/**
 * Extracts article snippets
 * @param {String} html News list page html
 * @return {Object[]} Array of article objects
 */
function parseArticleSnippets(html) {
  _validateInput(html);
  const $ = cheerio.load(html);
  const elements = $('#dle-content').find('.well');

  return elements.map((index, element) => {
    const articleSnippet = new ArticleSnippet($(element).html());

    return {
      title: articleSnippet.getTitle(),
      date: articleSnippet.getDate(),
      topic: articleSnippet.getTopic(),
      imageLink: articleSnippet.getImageLink(),
      description: articleSnippet.getDescription(),
      readMoreLink: articleSnippet.getReadMoreLink()
    };
  }).get();
}

/**
 * Validate input html to contain main content section
 * @param {String} html Input html
 * @throws {Error} Error for empty or invalid html
 * @private
 */
function _validateInput(html) {
  if (!html || !html.length) {
    throw new Error('Empty html supplied');
  }

  const $ = cheerio.load(html);
  if ($('#dle-content').length === 0) {
    throw new Error('Invalid html supplied. Cannot find #dle-content');
  }
}

module.exports = {
  parseArticle,
  parseArticleSnippets
};
