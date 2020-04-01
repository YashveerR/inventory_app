import { Component } from '@angular/core';
import {InventoryPage} from './inventory/inventory.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  rootPage: any = InventoryPage;

  constructor() {}
  ngOnInit(){        
  }
}
