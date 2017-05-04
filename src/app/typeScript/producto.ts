import { Comentario } from "./comentario";

export class Producto{
	comentario: Array<Comentario>;
	nombre: string;
	precio: number;
	veces: number;
	imagen: string;

	constructor() { }
}