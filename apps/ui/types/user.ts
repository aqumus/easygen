import { Entity } from "./base";

export type User = Entity<{
    name: string;
    email: string;
    password: string;
  }>;