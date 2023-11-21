import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
})
export class FavoritesListComponent implements OnInit {
  contacts: Contacto[] = [];
  loading: boolean = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerContacto();
  }

  // Obtener contactos para los favoritos
  obtenerContacto() {
    this.loading = true;
    this.apiService.getFavoriteContacts().subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('No se pudieron traer los contactos', err);
        console.log(err);
      },
    });
  }
}
