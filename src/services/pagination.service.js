export const totalPages = (size, count) => {
  return count < size ? 1 : Math.ceil(count / size);
};
export const paginateWithDots = (currentPage, delta, lastPage) => {
  var range = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(lastPage - 1, currentPage + delta);
    i += 1
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    if (range.length === lastPage - 3) {
      range.unshift(2);
    } else {
      range.unshift("...");
    }
  }

  if (currentPage + delta < lastPage - 1) {
    if (range.length === lastPage - 3) {
      range.push(lastPage - 1);
    } else {
      range.push("...");
    }
  }

  range.unshift(1);
  if (lastPage !== 1) range.push(lastPage);

  return range;
};
