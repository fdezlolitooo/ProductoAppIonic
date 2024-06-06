export class Item {
    presupuesto: number;
    unidad: string;
    producto: string;
    cantidad: number;
    valorUnitario: number;
    valorTotal: number;
    fechaAdquisicion: Date;
    proveedor: string;
  
    constructor(data: any) {
      this.presupuesto = data.presupuesto || 0;
      this.unidad = data.unidad || '';
      this.producto = data.producto || '';
      this.cantidad = data.cantidad || 0;
      this.valorUnitario = data.valorUnitario || 0;
      this.valorTotal = data.valorTotal || 0;
      this.fechaAdquisicion = data.fechaAdquisicion || new Date();
      this.proveedor = data.proveedor || '';
    }
  }
  