export type IUser = {
  UserID: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  point?: {
    points: number;
  };
};
