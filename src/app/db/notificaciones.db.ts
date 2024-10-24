import { INotificacion } from "../interfaces/i-notificacion.interface";

export const Notificaciones: INotificacion[] =[
  {
    "id_noti": 1,
    "tipo": "info",
    "mensaje": "Se ha creado una nueva tarea.",
    "fecha": new Date("2024-10-15T08:30:00"),
    "leido": false
  },
  {
    "id_noti": 2,
    "tipo": "alert",
    "mensaje": "Tu contraseña expirará en 3 días.",
    "fecha": new Date("2024-10-16T12:00:00"),
    "leido": true
  },
  {
    "id_noti": 3,
    "tipo": "warning",
    "mensaje": "La base de datos está cerca del límite de capacidad.",
    "fecha": new Date("2024-10-17T09:45:00"),
    "leido": false
  },
  {
    "id_noti": 4,
    "tipo": "success",
    "mensaje": "El informe ha sido generado exitosamente.",
    "fecha": new Date("2024-10-18T10:15:00"),
    "leido": true
  },
  {
    "id_noti": 5,
    "tipo": "error",
    "mensaje": "Hubo un error al sincronizar los datos.",
    "fecha": new Date("2024-10-18T11:00:00"),
    "leido": false
  }
]
