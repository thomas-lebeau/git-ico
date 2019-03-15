import { HEAD, N } from './constants';

export const trim = (value = '') => value.trim();

export const decorateBranch = rawBranch => {
    const isCurrent = rawBranch[0] === HEAD;
    const label = isCurrent ? rawBranch.slice(2) : rawBranch;

    return {
        label,
        value: label,
        isCurrent,
    };
};

export const decorateBranches = rawBranches =>
    rawBranches
        .split(N)
        .map(trim)
        .filter(Boolean)
        .map(decorateBranch);
