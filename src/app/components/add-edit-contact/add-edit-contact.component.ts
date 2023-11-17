import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css'],
})
export class AddEditContactComponent implements OnInit {
  formAddContact: FormGroup;
  id: number;
  actionPage: string = 'Agregar';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formAddContact = this.fb.group({
      contactName: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      cellphoneNumber: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.actionPage = 'Editar';
      this.obtenerContactoById(this.id);
    }
  }

  addEditContact() {
    // Objeto del contacto
    const contact: Contacto = {
      name: this.formAddContact.value.contactName,
      telephoneNumber: this.formAddContact.value.telephoneNumber,
      celularNumber: this.formAddContact.value.cellphoneNumber,
    };
    if (this.id != 0) {
      contact.id = this.id;
      this.editContact(this.id, contact);
    } else {
      this.addContact(contact);
    }
  }

  editContact(id: number, contact: Contacto) {
    this.ApiService.updateContact(id, contact).subscribe({
      next: () => {
        this.router.navigate(['/contacts-list']);
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }

  addContact(contact: Contacto) {
    this.loading = true;
    setTimeout(() => {
      this.ApiService.addContact(contact).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Contacto añadido.', 'Éxito');
          this.router.navigate(['/contacts-list']);
        },
        error: (err) => {
          setTimeout(() => {
            this.toastr.error('No se pudo añadir el contacto: ', err);
          }, 3000);
        },
      });
    }, 2000);
  }

  obtenerContactoById(id: number) {
    this.ApiService.getContactById(id).subscribe((data) => {
      this.formAddContact.patchValue({
        contactName: data.name,
        telephoneNumber: data.telephoneNumber,
        cellphoneNumber: data.celularNumber,
      });
      console.log(data);
    });
  }
}
