import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contacts: Contacto[] = [];
  displayedContacts: Contacto[] = [];
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerContacto();
  }

  // Table pagination
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
    // Definir el rango de elementos a mostrar en base a la página seleccionada
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedContacts = this.contacts.slice(startIndex, endIndex);
  }

  // Obtener contactos para la tabla
  obtenerContacto() {
    this.loading = true;
    this.apiService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.totalItems = this.contacts.length; // Actualizar el total de elementos
        this.calculatePages(); // Calcular las páginas después de obtener los datos
        this.changePage(1); // Asegurar que se muestren los primeros elementos al obtener los datos
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
      this.updateContact(contact.id, contact); // Llama a tu método existente de actualización
    } else {
      console.error('El contacto no tiene un ID definido.');
      // Puedes manejar el caso en el que contact.id sea undefined según tus necesidades.
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
