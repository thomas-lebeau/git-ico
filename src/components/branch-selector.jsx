const React = require('react');
const { useState } = require('react');
const PropTypes = require('prop-types');
const { Color, Box, useInput } = require('ink');
const importJsx = require('import-jsx');

const { NOOP, LABEL } = require('../utils/constants.js');

const TextInput = importJsx('ink-text-input').default;
const SelectInput = importJsx('ink-select-input').default;
const BranchesSelectorItem = importJsx('./branch-selector-item.jsx');
const BranchesSelectorIndicator = importJsx('./branch-selector-indicator.jsx');

function BranchesSelector({
    branches = [],
    initialQuery = '',
    lucky = false,
    onAbort = NOOP,
    onSelectBranch = NOOP,
}) {
    const [query, setQuery] = useState(initialQuery);

    useInput((input, key) => {
        if (key.escape) query ? setQuery('') : onAbort();
    });

    const queryFilter = branch => branch.value.includes(query);

    if (!branches.length) return null;

    if (lucky) onSelectBranch(branches[0]);

    return (
        <React.Fragment>
            <Box>
                <Color magenta bold>
                    {LABEL}
                </Color>
                <TextInput value={query} onChange={setQuery} />
            </Box>
            <SelectInput
                items={branches.filter(queryFilter)}
                indicatorComponent={BranchesSelectorIndicator}
                itemComponent={BranchesSelectorItem}
                onSelect={onSelectBranch}
                limit={10}
            />
        </React.Fragment>
    );
}

BranchesSelector.propTypes = {
    branches: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
            lastCommit: PropTypes.string,
            timeAgo: PropTypes.string,
            author: PropTypes.string,
        })
    ),
    initialQuery: PropTypes.string,
    lucky: PropTypes.bool,
    onAbort: PropTypes.func,
    onSelectBranch: PropTypes.func,
};

module.exports = BranchesSelector;
