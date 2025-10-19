import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenAiComponent } from '../gen-ai/gen-ai.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GenAiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
