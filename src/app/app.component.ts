import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./list/list.component";
import { AssistantComponent } from "./assistant/assistant.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, AssistantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /* INFO VARIABLES */
  title = 'Personal Assistant (Alpha)';
  author = 'Miguel Padilla'
  currDate = Date()
}
