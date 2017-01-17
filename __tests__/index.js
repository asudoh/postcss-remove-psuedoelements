'use strict';

const postcss = require('postcss');
const plugin = require('../index.js');

async function run(input, output, opts) {
  const result = await postcss([plugin(opts)]).process(input);
  expect(result.css.trim()).toEqual(output.trim());
  expect(result.warnings().length).toBe(0);
}

it(`Should remove pseudo elements in selectors`, async () => {
  await run('::placeholder, :-moz-placeholder, :-ms-input-placeholder, .foo { color: black; }', '.foo { color: black; }');
});

it(`Should remove entire rule if all selectors are of psuedo elements`, async () => {
  await run('::placeholder, :-moz-placeholder, :-ms-input-placeholder { color: black; }', '');
});

it(`Should keep rule intact if there is no selector of psuedo element`, async () => {
  await run('.foo, .bar { color: black; }', '.foo, .bar { color: black; }');
});
