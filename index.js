'use strict';

const postcss = require('postcss');
const parser = require('postcss-selector-parser');

// eslint-disable-next-line prefer-arrow-callback
module.exports = postcss.plugin('remove-pseudoelements', function postCssPluginRemovePseudoelements() {
  return function removePseudoelements(css) {
    css.walkRules((rule) => {
      const selector = parser((selectors) => {
        selectors.walkPseudos((pseudo) => {
          pseudo.remove();
        });
      }).process(rule.selector).result;
      if (!selector.trim()) {
        rule.remove();
      } else {
        rule.selector = selector;
      }
    });
  };
});
