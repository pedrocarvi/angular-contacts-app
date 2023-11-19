import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent {
  id: number;
  contacto!: Contacto;
  loading: boolean = false;

  constructor(
    private ApiService: ApiService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
    console.log(this.id);
  }

  ngOnInit(): void {
    this.obtenerContactoById();
  }

  obtenerContactoById() {
    this.loading = true;
    this.ApiService.getContactById(this.id).subscribe({
      next: (data) => {
        this.contacto = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al traer al contacto', err);
        console.log(err);
      },
    });
  }
}
