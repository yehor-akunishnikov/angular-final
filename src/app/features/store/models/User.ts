export interface User {
  _id: string,
  username: string,
  status: number,
  type: string;
  inviteId: string,
  age?: string,
  email?: string,
}