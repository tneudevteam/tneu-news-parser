const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const Article = require('../../lib/article');
const testHtml = fs.readFileSync(path.resolve(__dirname, 'article.test.html'), 'utf8');

describe('News Parser', function() {
  describe('Article Parser', function() {
    const article = new Article(testHtml);

    it('should return article title', function() {
      expect(article.getTitle()).to.equal('Арт-зустріч «НЕформат»');
    });

    it('should return date', function() {
      expect(article.getDate()).to.be.a('Date');
    });

    it('should return author', function() {
      expect(article.getAuthor()).to.contain('Відділ інформації');
    });

    it('should return image link', function() {
      expect(article.getImageLink()).to.contain('1474007227_9wyl4ddx09w.jpg');
    });

    it('should return article text', function() {
      expect(article.getText()).to.contain('молодь');
    });

    it('should return list of photos', function() {
      const photos = article.getPhotos();
      expect(photos).to.be.an('array');
      expect(photos).to.have.length.above(5);
    });

    it('should return list of attachments', function() {
      const attachments = article.getAttachments();

      expect(attachments).to.be.an('array');
      expect(attachments[0].name).to.contain('лист');
    });
  });
});
