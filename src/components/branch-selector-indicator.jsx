import React from 'react';
import PropTypes from 'prop-types';
import { Color, Box } from 'ink';
import { POINTER } from '../utils/constants';

export default function BranchesSelectorIndicator({ isSelected }) {
    return (
        <Box marginRight={1}>
            {isSelected ? <Color green>{POINTER}</Color> : ' '}
        </Box>
    );
}

BranchesSelectorIndicator.propTypes = {
    isSelected: PropTypes.bool,
};
