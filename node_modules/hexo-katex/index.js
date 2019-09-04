'use strict';

var katex = require('katex');
var util = require('hexo-util');
var cheerio;

hexo.extend.filter.register('after_post_render', function(data){
  var hexo = this,
      options = hexo.config.katex;

  var content = data.content;
  var linkTag = '';

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, {decodeEntities: true});

  if ($('.math').length > 0){
    linkTag = util.htmlTag('link', {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
    });
  }

  $('.math.inline').each(function(){
    var html = katex.renderToString($(this).text());
    $(this).replaceWith(html)
  });

  $('.math.display').each(function(){
    var html = katex.renderToString($(this).text(), { displayMode: true });
    $(this).replaceWith(html)
  });

  if (options && options.css === false) {
    data.content = $.html();
  } else {
    data.content = linkTag + $.html();
  }
});
