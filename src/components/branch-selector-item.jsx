import React from 'react';
import PropTypes from 'prop-types';
import { Color, Box } from 'ink';
import { LEFT } from '../utils/constants';

export default function BranchesSelectorItem({
    isSelected,
    label,
    lastCommit,
    author,
    timeAgo,
}) {
    return (
        <Box flexDirection="column" width="100%">
            <Box>
                <Color bold={isSelected} green={isSelected}>
                    {label}
                </Color>
            </Box>

            {isSelected && (
                <Box justifyContent="space-between" width="100%">
                    <Box marginLeft={1}>
                        <Color green dim>
                            {LEFT} {lastCommit}
                        </Color>
                    </Box>
                    <Box>
                        <Color green dim>
                            {author} - {timeAgo}
                        </Color>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

BranchesSelectorItem.propTypes = {
    isSelected: PropTypes.bool,
    label: PropTypes.string,
    lastCommit: PropTypes.string,
    author: PropTypes.string,
    timeAgo: PropTypes.string,
};
