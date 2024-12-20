
function sort(a, b) {
    if (!a || !b) return 0;
    return a < b ? -1 : a > b ? 1 : 0;
}

export default sort;
