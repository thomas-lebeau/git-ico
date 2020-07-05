const React = require('react');
const PropTypes = require('prop-types');
const { Color, Box } = require('ink');

const { LEFT } = require('../utils/constants.js');

function BranchesSelectorItem({
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

module.exports = BranchesSelectorItem;
