export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};
export type Signup = {
  name: string;
  email: string;
  password: string;
  checkout?: boolean;
  dialogId: string;
};
export type signin = Omit<Signup, 'name'>;
