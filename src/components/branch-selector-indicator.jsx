const React = require('react');
const PropTypes = require('prop-types');
const { Color, Box } = require('ink');

const { POINTER } = require('../utils/constants.js');

function BranchesSelectorIndicator({ isSelected }) {
    return (
        <Box marginRight={1}>
            {isSelected ? <Color green>{POINTER}</Color> : ' '}
        </Box>
    );
}

BranchesSelectorIndicator.propTypes = {
    isSelected: PropTypes.bool,
};

module.exports = BranchesSelectorIndicator;
