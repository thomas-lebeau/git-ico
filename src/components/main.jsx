const { exec } = require('child_process');

const React = require('react');
const { useEffect, useState } = require('react');
const { useApp } = require('ink');
const PropTypes = require('prop-types');
const importJsx = require('import-jsx');

const { LIST_BRANCHES, CHANGE_BRANCH } = require('../utils/constants.js');
const { decorateBranches } = require('../utils/utils.js');
const { SelectedBranch, Error } = importJsx('./messages.jsx');
const BranchesSelector = importJsx('./branch-selector.jsx');

function Main({ initialQuery, lucky }) {
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

module.exports = Main;
