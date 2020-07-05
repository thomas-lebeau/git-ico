const LIST_BRANCHES =
    "git for-each-ref --sort='-committerdate' --format='%(refname:short)%09%(subject)%09%(committerdate:relative)%09%(authorname)' refs/heads | sed -e 's-refs/heads/--'";
const CHANGE_BRANCH = 'git checkout';
const LABEL = `Filter: `;
const QUOTE = "'";
const NOOP = () => {};
const ESC = '\x1B';
const POINTER = '❯';
const LEFT = '└─';

module.exports = {
    LIST_BRANCHES,
    CHANGE_BRANCH,
    LABEL,
    QUOTE,
    NOOP,
    ESC,
    POINTER,
    LEFT,
};
