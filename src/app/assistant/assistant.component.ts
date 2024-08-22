import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent {
  showWarning: boolean = false
  /* LIST VARIABLES */
  currList: { item: string, selected: boolean }[] = [];
  all: boolean = false
  response: string = ''

  constructor(){}
  
  getListAssistance(all: boolean) {
    // Get current list
    this.getListItems()
    let newList = this.currList

    if (this.all == false){
      // Get a list of only the selected elements
      newList = newList.filter(element => element.selected)
    }
    console.log(`NEWLIST:`, newList)
    if (newList.length > 0){
      // Get all items (string) from each element
      let items : string = ''
      newList.forEach(el => {
        items += el.item + '\n'
      });
      // Remove last line break
      items = items.substring(0, items.length-1)
      console.log('ITEMS:', items)
      // Pass items to AI
      const formData = new FormData();
      formData.append('list', items);
      // TODO
    } else {
      let msg = 'No item selected! Please, select an item.'
      alert(msg)
      throw new Error(msg);
    }

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
