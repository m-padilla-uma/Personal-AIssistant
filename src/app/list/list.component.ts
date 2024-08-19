import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  /* LIST VARIABLES */
  currList: { item: string, selected: boolean }[] = [
    { item: 'Hello', selected: true },
    { item: 'World', selected: false },
  ];

  allSelected: boolean = false;

  newListItem: string =''

  constructor() {}

  ngOnInit() {
    const savedList = localStorage.getItem('currList');
    if (savedList) {
      this.currList = JSON.parse(savedList);
    }
    if (localStorage['currList'].length == 2){
      this.currList = [
        { item: 'Hello', selected: true },
        { item: 'World', selected: false },
      ];
      this.saveList();
      console.log('LOC STO',localStorage)

    }
  }

  ngOnDestroy() {
    this.saveList();
  }

  saveList() {
    localStorage.setItem('currList', JSON.stringify(this.currList));
  }

  removeAllItems() {
    if (localStorage['currList'].length > 2){
      if(confirm('You will clear all items on the list. Do you want to proceed?')){
        this.toogleSelectAllItems()
        this.removeItem()
      }  
    }
    else{
      alert('No items in list!')
    }
    this.saveList();
  }
  removeItem() {
    if (localStorage['currList'].includes('true')){
      this.currList = this.currList.filter(item => !item.selected);
      this.saveList();
    }
    else {
      alert('No item selected! Please, select an item.')
    }
  }

  toogleSelectAllItems() {
    this.allSelected = !this.allSelected;
    this.currList.forEach(item => item.selected = this.allSelected);
    this.saveList();
  }

  addListItem(el:string) {
    if(el != ''){
      this.currList.push({ item: el, selected: false })
      this.saveList();  
      this.newListItem = ''
    }
  }

}

