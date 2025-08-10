import bcrypt from 'bcryptjs';

export const users = [
  {
    name: "The Undertaker",
    email: "undertaker@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "John Cena",
    email: "cena@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
  {
    name: "The Rock",
    email: "rock@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
];
