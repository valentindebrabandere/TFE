/**
 * Arrange items in a grid-like fashion within a bounding box.
 * @param {DOMRect} boundingBox - The bounding box of the parent element.
 * @param {number} gap - The gap between the items in pixels.
 * @param {number} itemWidth - The width of the items in pixels.
 * @param {number} itemHeight - The height of the items in pixels.
 * @param {number} itemsCount - The total number of items.
 * @returns {Array<{top: number, left: number}>} - The top and left positions for each item.
 */
export function arrangeItemsInGrid(boundingBox: DOMRect, gap: number, itemsCount: number): Array<{top: number, left: number}> {
    let positions: Array<{top: number, left: number}> = [];
    const itemWidth: number = 70;
    const itemHeight: number = 90;
  
    // Determine how many items fit in a row.
    let itemsPerRow = Math.floor((boundingBox.width + gap) / (itemWidth + gap));
  
    // If the bounding box is too small for even a single item, return an empty array.
    if (itemsPerRow === 0) {
      return positions;
    }
  
    for (let i = 0; i < itemsCount; i++) {
      // Calculate the row and column index for the current item.
      let rowIndex = Math.floor(i / itemsPerRow);
      let columnIndex = i % itemsPerRow;
  
      // Calculate the top and left position for the current item.
      let top = 75 + rowIndex * (itemHeight + gap);
      let left = 30 + columnIndex * (itemWidth + gap);
  
      // Add the position to the array.
      positions.push({top, left});
    }
  
    return positions;
  }
  