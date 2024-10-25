import { ITeacher } from "../app/interfaces/iteacher.interface";
import { KNOWLEDGES } from "./knowledge.db"; // Asegúrate de importar KNOWLEDGES desde el archivo correspondiente

export const TEACHERS: ITeacher[] = [
  {
    id: 1,
    user_id: 1,
    description: 'Profesor de matemáticas con 10 años de experiencia.',
    price_p_hour: 5,
    experience: '10 años enseñando matemáticas en diferentes niveles.',
    rating: 5,
    validated: true,
    latitude: '40.4165',
    longitude: '-3.70256',
    knowledges: [
      KNOWLEDGES[0],
      KNOWLEDGES[1]
    ]
  },
  {
    id: 2,
    user_id: 2,
    description: 'Profesora de física con 8 años de experiencia.',
    price_p_hour: 10,
    experience: '8 años enseñando física en escuelas secundarias y universidades.',
    rating: 4.8,
    validated: true,
    latitude: '40.4165',
    longitude: '-3.70256',
    knowledges: [
      KNOWLEDGES[1],
      KNOWLEDGES[2]
    ]
  },
  {
    id: 3,
    user_id: 3,
    description: 'Profesor de química con 5 años de experiencia.',
    price_p_hour: 15,
    experience: '5 años enseñando química orgánica e inorgánica.',
    rating: 4.5,
    validated: true,
    latitude: '40.4165',
    longitude: '-3.70256',
    knowledges: [
      KNOWLEDGES[2],
      KNOWLEDGES[3]
    ]
  },
  {
    id: 4,
    user_id: 4,
    description: 'Profesora de biología con 7 años de experiencia.',
    price_p_hour: 20,
    experience: '7 años enseñando biología molecular y genética.',
    rating: 4.7,
    validated: true,
    latitude: '40.4165',
    longitude: '-3.70256',
    knowledges: [
      KNOWLEDGES[3],
      KNOWLEDGES[4]
    ]
  },
  {
    id: 5,
    user_id: 5,
    description: 'Profesor de ciencias con 6 años de experiencia.',
    price_p_hour: 25,
    experience: '6 años enseñando ciencias generales y ambientales.',
    rating: 4.4,
    validated: true,
    latitude: '40.4165',
    longitude: '-3.70256',
    knowledges: [
      KNOWLEDGES[4],
      KNOWLEDGES[5]
    ]
  }
];
