import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private ApiService: ApiService, private aRoute: ActivatedRoute) {
    this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
    console.log(this.id);
  }

  ngOnInit(): void {
    this.obtenerContactoById();
  }

  obtenerContactoById() {
    this.ApiService.getContactById(this.id).subscribe((data) => {
      this.contacto = data;
    });
  }
}
