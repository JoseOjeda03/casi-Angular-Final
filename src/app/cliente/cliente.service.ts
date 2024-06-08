import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviroment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Cliente } from '../cliente/cliente';
import { Region } from './region';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi: string = "";

  constructor(private http: HttpClient,
    private router: Router) {
    this.urlApi = environment.apiUrl + '/api'
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlApi + '/imuebles');


  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlApi}/clientes/regiones`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlApi + '/imuebles', cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente>{    
    return this.http.get<Cliente>(`${this.urlApi}/inmubles/id/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
 }

 update(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlApi}/cliente/${cliente.ref}`,cliente).pipe(
    catchError(e=>{
      if(e.status==400){
        return throwError(()=>e);
      }
      if(e.error.mensaje){
        console.error(e.error.mensaje);
      }
      return throwError(()=>e);
    })
  );
}

delete(id: number): Observable<any>{
  return this.http.delete<any>(`${this.urlApi}/cliente/${id}`).pipe(
    catchError(e=>{
       if(e.error.mensaje){
         console.error(e.error.mensaje);
       }
       return throwError(()=>e);
    })
  );
}

}
