import React, { Fragment, useState } from 'react';
import { Color, Box } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import useKeyHandler from '../hooks/useKeyHandler';
import { ESC, NOOP } from '../utils/constants';

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
        <Fragment>
            <Box marginRight={1}>
                <Color magenta>Filter: </Color>
                <TextInput value={query} onChange={setQuery} />
            </Box>
            <SelectInput
                items={branches.filter(queryFilter)}
                onSelect={onSelectBranch}
                limit={10}
            />
        </Fragment>
    );
}
