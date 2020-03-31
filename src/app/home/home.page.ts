import { Component } from '@angular/core';
import {Crud} from '../shared/services/crud'
import { RouterModule, Routes } from '@angular/router';
import {InventoryPage} from './inventory/inventory.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  rootPage: any = InventoryPage;

 

  clients:any;
  clientsId:string;
  clientsSense:string;
  clientsSenseVal:number;

  constructor(private crud_service:Crud) {}
  ngOnInit(){

    this.crud_service.read_data('IpGvAMwKPTwCcPZJQahA').subscribe(data => {

      console.log(data.data());
              id:data.id,

              this.clientsId= data.data()['Client'],
              this.clientsSense=data.data()['Sensor01'],
              this.clientsSenseVal = data.data()['Sensor01Val']
    });
    
  }
}
