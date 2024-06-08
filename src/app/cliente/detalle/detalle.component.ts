import { Component, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteComponent } from '../cliente.component';
import { ModalService } from './modal.service';
import { HttpEventType } from '@angular/common/http';
import { Factura } from '../../facturas/models/Factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import Swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  @Output() xxx:string;

  titulo: string="Detalle del Inmueble ";

  constructor(private clienteService: ClienteService,
              public modalService: ModalService,
              private facturaSevice: FacturaService){

  }

  ngOnInit(): void {
      this.xxx="rta";
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }



}
