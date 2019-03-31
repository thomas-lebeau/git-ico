import { exec } from 'child_process';
import React, { useEffect, useState } from 'react';

import { LIST_BRANCHES, CHANGE_BRANCH } from '../utils/constants';
import { decorateBranches } from '../utils/utils';
import { SelectedBranch, Error } from './messages';
import BranchesSelector from './branch-selector';

export default function Main({ initialQuery, lucky }) {
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

    useEffect(() => void exec(LIST_BRANCHES, onListBranches), [initialQuery]);

    if (error) return <Error>{error.message}</Error>;

    if (selectedBranch)
        return <SelectedBranch>{selectedBranch.label}</SelectedBranch>;

    return (
        <BranchesSelector
            lucky={lucky}
            branches={branches}
            onSelectBranch={onSelectBranch}
            initialQuery={initialQuery}
        />
    );
}
