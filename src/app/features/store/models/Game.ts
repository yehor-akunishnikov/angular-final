export interface Game {
  _id: string,
  name: string,
  price: {
    val: number,
    currency: string,
  }
  description: string,
  tags: string[],
};