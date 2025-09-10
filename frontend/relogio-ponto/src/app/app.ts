import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonPrimary } from './shared/components/button-primary/button-primary';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonPrimary],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('relogio-ponto');
}
