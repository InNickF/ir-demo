/**
 * Get pagination selector array
 * @param current
 * Current page number
 * @param total
 * Total number of available pages
 * @param size
 * Size of the selector
 * @returns
 * An array of page numbers
 */
function getPaginationSelector(
  current: number,
  total: number,
  size: number
): Array<number> {
  let selector;

  if (size < total) {
    let start = 0;
    let end = 0;

    if (total <= size) {
      start = 1;
      end = start + size - 1;
    } else {
      let delta = 0;

      if (size % 2 == 0) {
        delta = size / 2;
        start = current - delta + 1;
        end = current + delta;
      } else {
        delta = Math.floor(size / 2);
        start = current - delta;
        end = current + delta;
      }

      if (start <= 0) {
        start = 1;
        end = start + size - 1;
      }
      if (end > total) {
        end = total;
        start = end - size + 1;
      }
    }

    selector = [...Array(end - start + 1)].map((value, index) => {
      return start + index;
    });
  } else {
    selector = [...Array(total)].map((value, index) => {
      return index + 1;
    });
  }

  return selector;
}

export { getPaginationSelector };
