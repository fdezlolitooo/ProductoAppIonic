import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  editItemForm!: FormGroup;
  itemIndex!: number;
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.itemIndex = +this.route.snapshot.paramMap.get('index')!;
    this.item = this.itemService.getItem(this.itemIndex);

    this.editItemForm = this.formBuilder.group({
      presupuesto: [this.item.presupuesto, Validators.required],
      unidad: [this.item.unidad, Validators.required],
      producto: [this.item.producto, Validators.required],
      cantidad: [this.item.cantidad, [Validators.required, Validators.min(1)]],
      valorUnitario: [this.item.valorUnitario, [Validators.required, Validators.min(0)]],
      valorTotal: [{ value: this.item.valorTotal, disabled: true }, Validators.required],
      fechaAdquisicion: [this.formatDate(this.item.fechaAdquisicion), [Validators.required, this.dateValidator]],
      proveedor: [this.item.proveedor, Validators.required],
    });

    this.editItemForm.valueChanges.subscribe(values => {
      this.updateValorTotal();
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  updateValorTotal() {
    const cantidad = this.editItemForm.get('cantidad')?.value || 0;
    const valorUnitario = this.editItemForm.get('valorUnitario')?.value || 0;
    const valorTotal = cantidad * valorUnitario;
    this.editItemForm.get('valorTotal')?.setValue(valorTotal, { emitEvent: false });
  }

  async onSubmit() {
    if (this.editItemForm.valid) {
      const selectedDate = new Date(this.editItemForm.value.fechaAdquisicion);
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

      // Ajustar la fecha sumando un día
      selectedDate.setDate(selectedDate.getDate() + 1);

      const updatedItem: Item = new Item({
        ...this.editItemForm.value,
        valorTotal: this.editItemForm.get('valorTotal')?.value,
        fechaAdquisicion: selectedDate
      });
      this.itemService.updateItem(this.itemIndex, updatedItem);
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
