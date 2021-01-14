
function convertToYear(times) {
    const year = new Date(times * 1000).getFullYear();
    return year;
}

module.exports = { convertToYear };