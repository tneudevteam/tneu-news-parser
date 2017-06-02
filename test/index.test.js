const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const index = require('../index');
const testHtml = fs.readFileSync(path.resolve(__dirname, 'index.test.html'), 'utf8');
const testArticleHtml = fs.readFileSync(path.resolve(__dirname, 'lib/article.test.html'), 'utf8');

describe('News Parser', function() {
  it('should define parseArticle function', function() {
    expect(index.parseArticle).to.be.a('function');
  });

  it('should throw an error if passed empty html', function() {
    expect(index.parseArticle.bind(this, '')).to.throw(/Empty/);
  });

  it('should throw an error if passed html without proper content', function() {
    expect(index.parseArticle.bind(this, '<html></html>')).to.throw(/Invalid/);
  });

  it('should return article object', function() {
    const article = index.parseArticle(testArticleHtml);
    expect(article).to.be.an('object');
    expect(article.title).to.have.length.above(10);
  });

  it('should define parseArticleSnippets function', function() {
    expect(index.parseArticleSnippets).to.be.a('function');
  });

  it('should return 15 article snippets', function() {
    const results = index.parseArticleSnippets(testHtml);
    expect(results.length).to.equal(15);
  });
});
