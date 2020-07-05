export const LIST_BRANCHES =
    "git for-each-ref --sort='-committerdate' --format='%(refname:short)%09%(subject)%09%(committerdate:relative)%09%(authorname)' refs/heads | sed -e 's-refs/heads/--'";
export const CHANGE_BRANCH = 'git checkout';
export const LABEL = `Filter: `;
export const QUOTE = "'";
export const NOOP = () => {};
export const POINTER = '❯';
export const LEFT = '└─';
