import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Maia Dandachi',
    email: 'maia@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Aly Assem',
    email: 'aly@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sara Joe',
    email: 'sara@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
