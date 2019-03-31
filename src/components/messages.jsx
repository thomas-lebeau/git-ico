import React from 'react';
import { Color, Text } from 'ink';

import { QUOTE } from '../utils/constants';

export const Error = ({ children }) => <Color red>{children}</Color>;

export const Success = ({ children }) => <Color green>{children}</Color>;

export const SelectedBranch = ({ children }) => (
    <Text>
        Switched to branch {QUOTE}
        <Success>{children}</Success>
        {QUOTE}
    </Text>
);
