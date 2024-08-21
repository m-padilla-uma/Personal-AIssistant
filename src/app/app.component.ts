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
  title = 'Personal Assistant (in progress)';
  author = 'Miguel Padilla'
  currDate = Date()
}
// OPENAI_API_KEY = "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"
