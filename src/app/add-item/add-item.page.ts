import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  addItemForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private alertController: AlertController
  ) {
    this.addItemForm = this.formBuilder.group({
      presupuesto: ['', Validators.required],
      unidad: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
      valorTotal: [{ value: '', disabled: true }, Validators.required],
      fechaAdquisicion: ['', [Validators.required, this.dateValidator]],
      proveedor: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.addItemForm.valueChanges.subscribe(values => {
      this.updateValorTotal();
    });
  }

  updateValorTotal() {
    const cantidad = this.addItemForm.get('cantidad')?.value || 0;
    const valorUnitario = this.addItemForm.get('valorUnitario')?.value || 0;
    const valorTotal = cantidad * valorUnitario;
    this.addItemForm.get('valorTotal')?.setValue(valorTotal, { emitEvent: false });
  }

  async onSubmit() {
    if (this.addItemForm.valid) {
      const selectedDate = new Date(this.addItemForm.value.fechaAdquisicion);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        const alert = await this.alertController.create({
          header: 'Fecha inválida',
          message: 'La fecha de adquisición no puede ser anterior a la fecha actual.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const newItem: Item = new Item({
        ...this.addItemForm.value,
        valorTotal: this.addItemForm.get('valorTotal')?.value,
        fechaAdquisicion: selectedDate
      });
      this.itemService.addItem(newItem);
      this.router.navigate(['/item-list']);
    }
  }

  dateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }
}
