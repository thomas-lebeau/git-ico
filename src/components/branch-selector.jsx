import React, { useState } from 'react';
import { Color, Box } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import useKeyHandler from '../hooks/useKeyHandler';
import BranchesSelectorItem from './branch-selector-item';
import BranchesSelectorIndicator from './branch-selector-indicator';
import { ESC, NOOP, LABEL } from '../utils/constants';

export default function BranchesSelector({
    branches = [],
    onSelectBranch = NOOP,
    initialQuery = '',
}) {
    const [query, setQuery] = useState(initialQuery);

    useKeyHandler(key => {
        if (key === ESC) setQuery('');
    });

    const queryFilter = branch => branch.value.includes(query);

    if (!branches.length) return null;

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
