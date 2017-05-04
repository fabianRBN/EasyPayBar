import { Compra } from "./compra";
import { Recarga } from "./recarga";

export class Afiliado{
	key: number;
	compras: Array<Compra>;
	fechaAfiliacion: string;
	nombre: string;
	recargas: Array<Recarga>;
	saldo: number;
	uid: string;

	constructor(){
		this.key = 0;
	}
}
