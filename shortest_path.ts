class Cell {
  r: number;
  c: number;
  k: number;

  constructor(r: number, c: number, k: number) {
    this.r = r;
    this.c = c;
    this.k = k;
  }
}

function shortestPath(grid: number[][], k: number): number {
  if (grid.length == 1 && grid[0].length == 1) {
    return 0;
  }

  let visitedSet: Set<String> = new Set();

  let queue: Cell[] = [];
  let directions: number[][] = [
    [0, -1], // Left
    [1, 0], // Down
    [0, 1], // Right
    [-1, 0], // Up
  ];
  let start = new Cell(0, 0, k);
  queue.push(start);
  visitedSet.add(getString(start));

  let steps: number = 0;

  while (queue.length > 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let current: Cell = queue.shift()!;

      for (const direction of directions) {
        let newRow: number = current.r + direction[0];
        let newCol: number = current.c + direction[1];

        if (
          newRow >= 0 &&
          newRow < grid.length &&
          newCol >= 0 &&
          newCol < grid[newRow].length
        ) {
          if (newRow == grid.length - 1 && newCol == grid[newRow].length - 1) {
            return steps + 1;
          }

          if (grid[newRow][newCol] == 1) {
            if (current.k > 0) {
              let newCell = new Cell(newRow, newCol, current.k - 1);
              if (!visitedSet.has(getString(newCell))) {
                queue.push(newCell);
                visitedSet.add(getString(newCell));
              }
            }
          } else {
            let newCell = new Cell(newRow, newCol, current.k);
            if (!visitedSet.has(getString(newCell))) {
              queue.push(newCell);
              visitedSet.add(getString(newCell));
            }
          }
        }
      }
    }

    steps += 1;
  }

  return -1;
}

function getString(cell: Cell): string {
  return JSON.stringify(cell);
}

describe("1293. Shortest Path in a Grid with Obstacles Elimination", () => {
  it("Happy Path - 01", () => {
    expect(
      shortestPath(
        [
          [0, 0, 0],
          [1, 1, 0],
          [0, 0, 0],
          [0, 1, 1],
          [0, 0, 0],
        ],
        1
      )
    ).toStrictEqual(6);
  });
});
