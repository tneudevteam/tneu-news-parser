# TNEU News Parser

>  Parse news articles at [tneu.edu.ua](http://www.tneu.edu.ua/news/)

[![Build Status](https://travis-ci.org/vladgolubev/tneu-news-parser.svg?branch=master)](https://travis-ci.org/vladgolubev/tneu-news-parser)


## Install

Ensure you have [Node.js](https://nodejs.org) version 4 or higher installed. Then run the following:

```
$ npm install @tneu/news-parser --save
```

## Usage

```javascript

const got = require('got');
const NewsParser = require('tneu-news-parser');

// Parse article snippets
got('http://www.tneu.edu.ua/news/page/1')
  .then(response => {
    return NewsParser.parseArticleSnippets(response.body);
  })
  .then(articleSnippets => {
    /*
      [
        {
          title: 'На кафедрі фінансів імені...',
          date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
          topic: 'Міжнародні програми',
          imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
          description: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
          readMoreLink: 'http://www.tneu.edu.ua/news/9678-na-kafedri....'
        }
      ]
    */
  });

// Parse a particular article
got('http://www.tneu.edu.ua/news/9671-naukovo-praktychne-zabezpechennia.html')
  .then(response => {
    return NewsParser.parseArticle(response.body);
  })
  .then(article => {
    /*
      {
          title: 'На кафедрі фінансів імені...',
          date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
          imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
          author: 'Відділ інформації та зв'
          язків з громадськістю ',
          text: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
          photos: ['http://www.tneu.edu.ua/uploads/posts/...', '....'],
          attachments: [{ name: '....', link: '....' }]
      }
    */
  });

```

## Development

### Tests

Used: chai, mocha

```
$ npm test
```

### Coverage

Used: istanbul

```
$ npm run coverage
```

### Linting

Used: eslint, eslint-config-google

```
$ npm run lint
```
