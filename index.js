/*
 * Title Caps
 *
 * Cleaned up and added to NPM - Matthew Mueller - 1 Sept 2014
 * Extended Jan 12 2013 to lowercase all prepositions.
 * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */


/**
 * Module Dependencies
 */

var prepositions = require('./lib/prepositions.json');
var conjunctions = require('./lib/conjunctions.json');
var articles = require('./lib/articles.json');

/**
 * Export `capitalize`
 */

module.exports = capitalize;

/**
 * Regexps
 */

var rpunct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";
var rlowercase = '(' + (prepositions.concat(articles).concat(conjunctions)).join('|') + ')';
var rsplit = /[:.;?!] |(?: |^)["Ò]/g;

/**
 * I have no idea what these do :-P
 */

var ra = /[\u2018\u2019]/g;
var rb = /[\u201C\u201D]/g;
var rc = /\b([A-Za-z][a-z.'Õ]*)\b/g;
var rd = /[A-Za-z]\.[A-Za-z]/;
var re = RegExp("\\b" + rlowercase + "\\b", "ig")
var rf = RegExp("^" + rpunct + rlowercase + "\\b", "ig");
var rg = RegExp("\\b" + rlowercase + rpunct + "$", "ig");
var rh = / V(s?)\. /ig;
var ri = /(['Õ])S\b/ig;
var rj = /\b(AT&T|Q&A)\b/ig;

/**
 * Properly capitalize a title
 *
 * @param {String} title
 * @return {String} title
 * @api public
 */

function capitalize(title) {
  var parts = [];
  var index = 0;

  title = title
    .replace(ra, "'")
    .replace(rb, '"');

  while (1) {
    var m = rsplit.exec(title);

    parts.push(title.substring(index, m ? m.index : title.length)
      .replace(rc, function(all){
        return rd.test(all) ? all : upper(all);
      })
      .replace(re, lower)
      .replace(rf, function(all, punct, word){
        return punct + upper(word);
      })
      .replace(rg, upper));

    index = rsplit.lastIndex;

    if (m) parts.push(m[0]);
    else break;
  }

  return parts.join("").replace(rh, " v$1. ")
    .replace(ri, "$1s")
    .replace(rj, function(all){
      return all.toUpperCase();
    });
}

/**
 * To lowercase
 *
 * @param {String} word
 * @return {String}
 * @api private
 */

function lower(word) {
  return word.toLowerCase();
}

/**
 * Capitalize
 *
 * @param {String} word
 * @return {String}
 * @api private
 */

function upper(word) {
  return word.substr(0,1).toUpperCase() + word.substr(1);
}
