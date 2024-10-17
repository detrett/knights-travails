export class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.coordinates = [row, column];
  }

  getCoordinates() {
    return `${this.row},${this.column}`;
  }
}