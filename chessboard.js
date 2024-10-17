import { Tile } from "./tile.js";

export class Chessboard {
  // Possible knight moves
  knightMoves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
  ];
  moveList;

  constructor() {
    this.moveList = new Map();
    this.board = this.initialize();
    this.addMoves();
  }

  initialize() {
    const rows = 8;
    const columns = 8;
    const board = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board.push(new Tile(i, j));
      }
    }

    board.forEach((tile) => {
      this.addNode(tile.getCoordinates());
    });

    return board;
  }

  addNode(tile) {
    this.moveList.set(tile, new Set());
  }

  addMove(tile1, tile2) {
    this.moveList.get(tile1).add(tile2);
    this.moveList.get(tile2).add(tile1);
  }

  getMoves(tile) {
    return this.moveList.get(tile);
  }

  canMove(tile1, tile2) {
    return this.moveList.get(tile1).has(tile2);
  }

  // Helper function to check if the knight resulting position exists in the gameboard
  isInBounds(row, column) {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  addMoves() {
    this.board.forEach((tile) => {
      const { row, column } = tile;
      const currentCoordinates = tile.getCoordinates();

      this.knightMoves.forEach(([rowOffset, colOffset]) => {
        const newRow = row + rowOffset;
        const newCol = column + colOffset;

        if (this.isInBounds(newRow, newCol)) {
          const targetCoordinates = `${newRow},${newCol}`;
          this.addMove(currentCoordinates, targetCoordinates);
        }
      });
    });
  }

  printTilesAndMoves() {
    this.board.forEach((tile) => {
      const coordinates = tile.getCoordinates();
      const moves = Array.from(this.getMoves(coordinates))
        .map((move) => `(${move})`)
        .join(", ");
      console.log(`(${coordinates}) -> ${moves}`);
    });
  }

  knightTravails(startPos, endPos) {
    if (startPos === endPos) {
      this.displayPath([startPos])
    }

    const visited = new Set();
    let queue = [{ position: startPos, path: [startPos] }];

    while (queue.length > 0) {
      const { position: currentPos, path: currentPath } = queue.shift();

      if (currentPos === endPos) {
        this.displayPath(currentPath);
        break;
      }

      visited.add(currentPos);

      const possibleMoves = this.getMoves(currentPos);

      let unvisitedMoves = Array.from(
        this.difference(possibleMoves, visited)
      ).map((move) => `${move}`);

      unvisitedMoves.forEach((move) => {
        const newPath = [...currentPath, move];
        queue.push({ position: move, path: newPath });
      });
    }
    return [];
  }

  displayPath(path) {
    const length = path.length - 1;
    console.log(`You made it in ${length} move${length !== 1 ? "s" : ""}! Here's your path:`);
    path.forEach((step) => console.log(`(${step})`))

  }

  // Helper function to implement javascript's difference function of set that is not available here yet
  difference(setA, setB) {
    const result = new Set();
    for (const item of setA) {
      if (!setB.has(item)) {
        result.add(item);
      }
    }
    return result;
  }
}
