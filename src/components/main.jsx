import { exec } from 'child_process';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { LIST_BRANCHES, CHANGE_BRANCH } from '../utils/constants';
import { decorateBranches } from '../utils/utils';
import { SelectedBranch, Error } from './messages';
import BranchesSelector from './branch-selector';
import { useApp } from 'ink';

export default function Main({ initialQuery, lucky }) {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState();
    const [error, setError] = useState();
    const { exit } = useApp();

    const onListBranches = (err, rawBranches) => {
        if (err) setError(err);
        setBranches(decorateBranches(rawBranches));
    };

    const onChangeBranch = (err, branch) => {
        if (err) setError(err);
        setSelectedBranch(branch);
    };

    const onAbort = () => exit();

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
            onAbort={onAbort}
            onSelectBranch={onSelectBranch}
            initialQuery={initialQuery}
        />
    );
}

Main.propTypes = {
    initialQuery: PropTypes.string,
    lucky: PropTypes.bool,
};
