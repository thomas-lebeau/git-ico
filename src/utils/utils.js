const trim = (value = '') => value.trim();

const decorateBranch = rawBranch => {
    const [label, lastCommit, timeAgo, author] = rawBranch.split('\t');

    return {
        label,
        value: label,
        lastCommit,
        timeAgo,
        author,
    };
};

const decorateBranches = rawBranches =>
    rawBranches
        .split('\n')
        .map(trim)
        .filter(Boolean)
        .map(decorateBranch);

module.exports = {
    trim,
    decorateBranch,
    decorateBranches,
};
