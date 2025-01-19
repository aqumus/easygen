import { User } from "./user";

export type AuthResponse = {
    jwt: string;
    user: User;
  };