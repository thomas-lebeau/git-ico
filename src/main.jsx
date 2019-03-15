#!/usr/bin/env node

import { exec } from 'child_process';
import React, { useEffect, useState } from 'react';
import { render } from 'ink';

import { SelectedBranch, Error } from './components';
import { LIST_BRANCHES, CHANGE_BRANCH } from './utils/constants';
import BranchesSelector from './components/branch-selector';
import { decorateBranches } from './utils/utils';

const Main = ({ args }) => {
    const [initialQuery] = args;
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState();
    const [error, setError] = useState();

    const onListBranches = (err, rawBranches) => {
        if (err) setError(err);
        setBranches(decorateBranches(rawBranches));
    };

    const onChangeBranch = (err, branch) => {
        if (err) setError(err);
        setSelectedBranch(branch);
    };

    const onSelectBranch = branch => {
        const cmd = `${CHANGE_BRANCH} ${branch.value}`;
        if (!branch.isCurrent) exec(cmd, err => onChangeBranch(err, branch));
    };

    useEffect(() => void exec(LIST_BRANCHES, onListBranches), [args]);

    if (error) return <Error>{error.message}</Error>;

    if (selectedBranch)
        return <SelectedBranch>{selectedBranch.label}</SelectedBranch>;

    return (
        <BranchesSelector
            branches={branches}
            onSelectBranch={onSelectBranch}
            initialQuery={initialQuery}
        />
    );
};

render(<Main args={process.argv.slice(2)} />);
