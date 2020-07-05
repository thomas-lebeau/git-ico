import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Color, Box, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import BranchesSelectorItem from './branch-selector-item';
import BranchesSelectorIndicator from './branch-selector-indicator';
import { NOOP, LABEL } from '../utils/constants';

export default function BranchesSelector({
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
        <>
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
        </>
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
