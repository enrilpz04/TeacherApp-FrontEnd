import { Rol } from '../app/interfaces/iuser.interface'

export const USER = [
  {
    id: 1,
    name: 'Fernando',
    surname: 'De Castro',
    email: 'fernando@gmail.com',
    password: '1234',
    rol: Rol.TEACHER
  },
  {
    id: 2,
    name: 'Ana',
    surname: 'García',
    email: 'ana@gmail.com',
    password: '5678',
    rol: Rol.TEACHER
  },
  {
    id: 3,
    name: 'Luis',
    surname: 'Martínez',
    email: 'luis@gmail.com',
    password: 'abcd',
    rol: Rol.TEACHER
  },
  {
    id: 4,
    name: 'María',
    surname: 'López',
    email: 'maria@gmail.com',
    password: 'efgh',
    rol: Rol.TEACHER
  },
  {
    id: 5,
    name: 'Carlos',
    surname: 'Pérez',
    email: 'carlos@gmail.com',
    password: 'ijkl',
    rol: Rol.TEACHER
  }
];
