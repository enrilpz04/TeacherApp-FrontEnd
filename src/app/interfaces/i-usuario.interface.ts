export interface IUsuario {
    id_user?: number;
    nombre: string;
    apellido?: string;
    email: string;
    contraseña: string;
    rol: string;
    direccion?: string;
}
