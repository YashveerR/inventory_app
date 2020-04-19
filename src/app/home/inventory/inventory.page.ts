import { Component, OnInit } from '@angular/core';
import {Crud} from '../../shared/services/crud'
import {ChartPage} from '../chart/chart.page'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  clients:any;
  clientsId:string;
  clientsSense:string;
  clientsSenseVal:number;
  clientsVolume:number;

  dynamicVolume:number;

  dynamicColor:string

  dynamicMessage:string;

  constructor(private crud_service:Crud) { 

  }

  ngOnInit() {

    this.crud_service.read_data('IpGvAMwKPTwCcPZJQahA').subscribe(data => {

      console.log(data.data());
              id:data.id,

              this.clientsId= data.data()['Client'],
              this.clientsSense=data.data()['Sensor01'],
              this.clientsSenseVal = data.data()['Sense01Val']
              this.clientsVolume = data.data()['Volume']
              console.log(this.clientsSenseVal);
              console.log(this.clientsVolume);
              this.calculate();
              
    });
    

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.read();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  calculate()
  {
    this.dynamicVolume = (this.clientsSenseVal / this.clientsVolume) * 100

    console.log(this.dynamicVolume);
    if (this.dynamicVolume >= 65)
    {
      this.dynamicColor = "success"
      this.dynamicMessage = "Uber Cool, looks like we are A OK for use"
    }
    else if ((this.dynamicVolume > 30) && (this.dynamicVolume < 65))
    {
      this.dynamicColor = "warning"
      this.dynamicMessage = "Hmmmm ... we are still fine here, onward..."
    }
    else
    {
      this.dynamicColor = "danger"
      this.dynamicMessage = "Arrrrrrghhhh, its time to fill up, its running empty"
    }
  }

  read()
  {
    this.crud_service.read_data('IpGvAMwKPTwCcPZJQahA').subscribe(data => {

      console.log(data.data());
              id:data.id,

              this.clientsId= data.data()['Client'],
              this.clientsSense=data.data()['Sensor01'],
              this.clientsSenseVal = data.data()['Sense01Val']
              this.clientsVolume = data.data()['Volume']
              console.log(this.clientsSenseVal);
              console.log(this.clientsVolume);
              this.calculate();
              
    });
  }

}
