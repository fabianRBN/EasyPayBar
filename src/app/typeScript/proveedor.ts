import { Afiliado } from "./afiliado";
import { Categoria } from "./categoria";

export class Proveedor{
	afiliados: Array<Afiliado>;
	apellido: string;
	codigoQR: string;
	bar: string;
	categoria:Array<Categoria>;
	nombre: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}