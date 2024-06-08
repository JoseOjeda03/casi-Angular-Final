import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  title: string='Inmuble';
  clientes: Cliente[]=[];
  clienteSeleccionado: Cliente;
  

  constructor(private clienteService:ClienteService,
              private router:Router,
              private modalService:ModalService){

  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void{
    this.clienteService.getClientes().subscribe({
      next:(respuesta)=>{
        this.clientes=respuesta;
        
      },
      error:()=>{},
      complete:()=>{
        console.log(this.clientes);
      }
    });

  }

 abrilModal(cliente: Cliente){
   this.clienteSeleccionado=cliente;
   this.modalService.abrirModal();
 }

  delete(cliente: Cliente): void{

  Swal.fire({
    title: 'Está seguro?',
    text: `¿Seguro que desea eliminar el cliente: ${cliente.imueble}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result)=>{
    if(cliente.ref!=undefined){
      this.clienteService.delete(Number(cliente.ref)).subscribe({
        next: ()=>{
          this.clientes = this.clientes.filter(cli=>cli!==cliente)
          Swal.fire(
            'Cliente Elminado',
            `Cliente ${cliente.imueble} eliminado con éxito`,
            'success'
         )
        }
      })
    } 

  });  
 }

}
