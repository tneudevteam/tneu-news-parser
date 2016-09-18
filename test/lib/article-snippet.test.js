const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const testHtml = fs.readFileSync(path.resolve(__dirname, 'article-snippet.test.html'), 'utf8');
const ArticleSnippet = require('../../lib/article-snippet');

describe('News Parser', function() {
  describe('Article Snippet Parser', function() {
    const articleSnippet = new ArticleSnippet(testHtml);

    it('should return title', function() {
      expect(articleSnippet.getTitle()).to.contain('Увага! Кредитна');
    });

    it('should return date', function() {
      expect(articleSnippet.getDate()).to.be.a('Date');
    });

    it('should return topic', function() {
      expect(articleSnippet.getTopic()).to.equal('Міжнародні програми');
    });

    it('should return description', function() {
      expect(articleSnippet.getDescription()).to.contain('Шановні працівники');
    });

    it('should return image link', function() {
      expect(articleSnippet.getImageLink()).to.contain('51428517078.jpg');
    });

    it('should return read more link', function() {
      expect(articleSnippet.getReadMoreLink()).to.contain('-respublika-polscha.html');
    });
  });
});
