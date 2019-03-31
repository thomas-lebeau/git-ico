#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
import meow from 'meow';

import Main from './components/main';

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

render(<Main initialQuery={initialQuery} lucky={lucky} />);
