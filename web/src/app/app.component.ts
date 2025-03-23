import { Component } from '@angular/core';
import { ExampleComponent } from './components/example/example.component';

@Component({
  selector: 'app-root',
  imports: [ExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
