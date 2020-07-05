#!/usr/bin/env node

const React = require('react');
const { render } = require('ink');
const meow = require('meow');
const importJsx = require('import-jsx');

const cli = meow(
    `
	Usage
	  $ git ico [text]
	Example
      $ git ico foo

	Options
	  --lucky, -l      Go to the first result
`,
    {
        flags: {
            lucky: {
                type: 'boolean',
                default: false,
                alias: 'l',
            },
        },
    }
);

const [initialQuery] = cli.input;
const { lucky } = cli.flags;

const Main = importJsx('./components/main.jsx');

render(React.createElement(Main, { initialQuery, lucky }));
