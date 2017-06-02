const fs = require('fs');
const path = require('path');

const Article = require('../../lib/article');
const testHtml = fs.readFileSync(path.resolve(__dirname, 'article.test.html'), 'utf8');
const article = new Article(testHtml);

it('should return article title', () => {
  expect(article.getTitle()).toEqual('Арт-зустріч «НЕформат»');
});

it('should return date', () => {
  expect(article.getDate()).toBeInstanceOf(Date);
});

it('should return author', () => {
  expect(article.getAuthor()).toMatch('Відділ інформації');
});

it('should return image link', () => {
  expect(article.getImageLink()).toMatch('1474007227_9wyl4ddx09w.jpg');
});

it('should return article text', () => {
  expect(article.getText()).toMatch('молодь');
});

it('should return list of photos', () => {
  const photos = article.getPhotos();
  expect(photos).toHaveLength(10);
});

it('should return list of attachments', () => {
  const attachments = article.getAttachments();

  expect(attachments[0].name).toMatch('лист');
});
