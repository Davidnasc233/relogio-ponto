import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  imports: [],
  templateUrl: './button-primary.html',
  styleUrl: './button-primary.css'
})
export class ButtonPrimary {
  @Input() texto: string = 'Adicionar Marcação';
}
