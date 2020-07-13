module.exports = {
  pages(array, items_page, page = 1) {
    const max_pages = Math.ceil(array.length / items_page);
    if (page < 1 || page > max_pages) return null;

    return array.slice((page - 1) * items_page, page * items_page);
  },
};
