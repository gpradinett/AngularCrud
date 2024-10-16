import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  newPerson = { name: '', address: '', phone: null };
  editingItem: any = null;  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  addPerson() {
    this.apiService.addPerson(this.newPerson).subscribe(response => {
      console.log('Person added', response);
      this.llenarData(); // Recargar la lista de personas
      this.newPerson = { name: '', address: '', phone: null }; // Limpiar el formulario
    });
  }

  editItem(item: any) {
    this.editingItem = { ...item }; // Clona el ítem para editar
  }

  saveEdit(item: any) {
    this.apiService.updatePerson(this.editingItem.id, this.editingItem).subscribe(response => {
      const index = this.data.findIndex(i => i.id === this.editingItem.id);
      this.data[index] = this.editingItem; // Actualiza el ítem en la lista
      this.editingItem = null; // Resetea el modo edición
    });
  }

  cancelEdit() {
    this.editingItem = null; // Sale del modo edición
  }

  deleteItem(id: number) {
    this.apiService.deletePerson(id).subscribe(response => {
      this.data = this.data.filter(item => item.id !== id); // Elimina el ítem de la lista
    });
  }
}
