export const trim = (value = '') => value.trim();

export const decorateBranch = rawBranch => {
    const [label, lastCommit, timeAgo, author] = rawBranch.split('\t');

    return {
        label,
        value: label,
        lastCommit,
        timeAgo,
        author,
    };
};

export const decorateBranches = rawBranches =>
    rawBranches
        .split('\n')
        .map(trim)
        .filter(Boolean)
        .map(decorateBranch);
