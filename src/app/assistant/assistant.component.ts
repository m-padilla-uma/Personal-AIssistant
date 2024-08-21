import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OpenAIService } from '../openai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.css'
})
export class AssistantComponent {
  /* LIST VARIABLES */
  currList: { item: string, selected: boolean }[] = [];
  all: boolean = false
  response: string = ''

  constructor(private openAiService: OpenAIService){}
  getListAssistance(all: boolean) {
    // Get current list
    this.getListItems()
    let newList = this.currList
    let response
    if (this.all == false){
      // Get a list of only the selected elements
      newList = newList.filter(element => element.selected)
    }
    console.log(`NEWLIST:`, newList)
    if (newList.length > 0){
      // Get all items (string) from each element
      let items : string[] = []
      newList.forEach(el => {
        items.push(el.item)
      });
      console.log('ITEMS:', items)
      // Pass items to GPT
      let response = this.openAiService.sendListToGPT(items)
      console.log("RESPONSE RECEIVED:", response)
    } else {
      let msg = 'No item selected! Please, select an item.'
      alert(msg)
      throw new Error(msg);
    }
    return response


  }

  getListItems() {
    const savedList = localStorage.getItem('currList');
    if (savedList) {
      this.currList = JSON.parse(savedList);
    }
    if (this.currList.length < 1){
      alert('No items in list!')
      throw new Error('No items in list!');
    }
    console.log(this.currList)
  }

}
