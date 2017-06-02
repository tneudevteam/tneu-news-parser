const fs = require('fs');
const path = require('path');

const index = require('../index');
const testHtml = fs.readFileSync(path.resolve(__dirname, 'index.test.html'), 'utf8');
const testArticleHtml = fs.readFileSync(path.resolve(__dirname, 'lib/article.test.html'), 'utf8');

it('should define parseArticle function', () => {
  expect(index.parseArticle).toBeInstanceOf(Function);
});

it('should throw an error if passed empty html', () => {
  expect(index.parseArticle.bind(this, '')).toThrow(/Empty/);
});

it('should throw an error if passed html without proper content', () => {
  expect(index.parseArticle.bind(this, '<html></html>')).toThrow(/Invalid/);
});

it('should return article object', () => {
  const article = index.parseArticle(testArticleHtml);
  expect(article).toBeInstanceOf(Object);
  expect(article.title).toMatch(/.{10,}/);
});

it('should define parseArticleSnippets function', () => {
  expect(index.parseArticleSnippets).toBeInstanceOf(Function);
});

it('should return 15 article snippets', () => {
  const results = index.parseArticleSnippets(testHtml);
  expect(results.length).toBe(15);
});
