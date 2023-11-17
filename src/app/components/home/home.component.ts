import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerContacto();
  }

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

  obtenerContacto() {
    this.apiService.getContacts().subscribe((data) => {
      this.contacts = data;
      this.totalItems = this.contacts.length; // Actualizar el total de elementos
      this.calculatePages(); // Calcular las páginas después de obtener los datos
      this.changePage(1); // Asegurar que se muestren los primeros elementos al obtener los datos
      console.log(this.contacts);
    });
  }

  eliminarContacto(id: number) {
    this.apiService.deleteContact(id).subscribe(() => {
      this.obtenerContacto();
    });
  }
}
