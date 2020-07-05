const React = require('react');
const { Color, Text } = require('ink');

const { QUOTE } = require('../utils/constants.js');

const Error = ({ children }) => <Color red>{children}</Color>;

const Success = ({ children }) => <Color green>{children}</Color>;

const SelectedBranch = ({ children }) => (
    <Text>
        Switched to branch {QUOTE}
        <Success>{children}</Success>
        {QUOTE}
    </Text>
);

module.exports = {
    Error,
    Success,
    SelectedBranch,
};
