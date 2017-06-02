const fs = require('fs');
const path = require('path');

const testHtml = fs.readFileSync(path.resolve(__dirname, 'article-snippet.test.html'), 'utf8');
const ArticleSnippet = require('../../lib/article-snippet');

const articleSnippet = new ArticleSnippet(testHtml);

it('should return title', () => {
  expect(articleSnippet.getTitle()).toMatch('Увага! Кредитна');
});

it('should return date', () => {
  expect(articleSnippet.getDate()).toBeInstanceOf(Date);
});

it('should return topic', () => {
  expect(articleSnippet.getTopic()).toBe('Міжнародні програми');
});

it('should return description', () => {
  expect(articleSnippet.getDescription()).toMatch('Шановні працівники');
});

it('should return image link', () => {
  expect(articleSnippet.getImageLink()).toMatch('51428517078.jpg');
});

it('should return read more link', () => {
  expect(articleSnippet.getReadMoreLink()).toMatch('-respublika-polscha.html');
});
