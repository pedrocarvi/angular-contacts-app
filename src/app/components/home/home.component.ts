import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/services/api.service';

// Todos los componentes se conforman de un: html, css, js/ts
// Html: esqueleto y estructura del contenido
// Css: estilos, diseños del contenido
// Js/Ts: funciones o acciones dinámicas del componente. Endpoints, loaders, toastr, etc.
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // guardo la data de getAllContacts en la variable de arreglo contacts. Para iterarlos despues en el html.
  contacts: Contacto[] = [];
  // variable c los contactos p mostrar según el pagination.
  displayedContacts: Contacto[] = [];
  // booleano p indicar la condicion de los loaders
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Indica qué hacer al componente ni bien se activa
  ngOnInit(): void {
    this.obtenerContacto();
  }

  // Variables y funciones p el pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  pages: number[] = [];

  calculatePages(): void {
    this.pages = [];
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedContacts = this.contacts.slice(startIndex, endIndex);
  }

  // Obtener contactos para la tabla
  obtenerContacto() {
    this.loading = true;
    // En el apiService está la llamada al ep y me retorna la respuesta de ese ep.
    this.apiService.getContacts().subscribe({
      next: (data) => {
        // guardo la data de allContacts en contacts
        this.contacts = data;
        // Pagination
        this.totalItems = this.contacts.length; // Actualizar el total de elementos
        this.calculatePages(); // Calcular las páginas después de obtener los datos
        this.changePage(1); // Asegurar que se muestren los primeros elementos al obtener los datos
        // Condición loading false cuando termina
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('No se pudieron traer los contactos', err);
        console.log(err);
      },
    });
  }

  confirmarEliminacion(contact: Contacto) {
    const confirmacion = window.confirm(
      'Are you sure you want to delete this contact?'
    );

    if (confirmacion && contact.id !== undefined) {
      this.eliminarContacto(contact.id);
    }
  }

  eliminarContacto(id: number) {
    this.loading = true;
    this.apiService.deleteContact(id).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerContacto();
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('No se pudo eliminar el contacto', err);
        console.log(err);
      },
    });
  }

  toggleFavorite(contact: Contacto): void {
    contact.favorite = !contact.favorite; // Invierte el valor de favorito
    if (contact.id !== undefined) {
      this.updateContact(contact.id, contact);
    } else {
      console.error('El contacto no tiene un ID definido.');
    }
  }

  updateContact(id: number, contact: Contacto): void {
    this.loading = true;
    this.apiService.updateContact(id, contact).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Contacto añadido a favorito', 'Éxito');
        this.router.navigate(['/contacts-list']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('No se pudo añadir a favoritos: ', err);
        console.log('Error: ', err);
      },
    });
  }
}
