export class BeerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BeerError';
  }
}