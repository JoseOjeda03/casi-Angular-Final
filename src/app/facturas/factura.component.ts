import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Factura } from './models/Factura';
import { ClienteService } from '../cliente/cliente.service';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/Producto';
import { ItemFactura } from './models/ItemFactura';
import { Cliente } from '../cliente/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {


  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;


  constructor(private clienteService: ClienteService,
    private facturaService: FacturaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
  
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        mergeMap(value => value ? this._filter(value) : [])
      );
  }
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }


 seleccionarProducto(value: any): void {
  let producto = value as Producto;
  console.log(producto);
  if (this.existeItem(producto.id)) {
    this.incrementaCantidad(producto.id);
  } else {
    let nuevoItem = new ItemFactura();
    nuevoItem.producto = producto;
    this.factura.items.push(nuevoItem);
  }

  this.autocompleteControl.setValue('');
}

existeItem(id: number): boolean {
  let existe = false;
  this.factura.items.forEach((item: ItemFactura) => {
    if (id === item.producto.id) {
      existe = true;
    }
  });
  return existe;
}

incrementaCantidad(id: number): void {
  this.factura.items = this.factura.items.map((item: ItemFactura) => {
    if (id === item.producto.id) {
      ++item.cantidad;
    }
    return item;
  });
}

mostrarNombre(producto?: Producto): string | undefined {
  return producto ? producto.nombre : undefined;
}





  create(facturaForm): void {
    console.log(this.factura);
    if (this.factura.items.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        Swal.fire(this.titulo, `Factura ${factura.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      });
    }
  }


  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }


  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }









}
