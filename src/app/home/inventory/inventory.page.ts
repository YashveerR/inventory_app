import { Component, OnInit } from '@angular/core';
import {Crud} from '../../shared/services/crud'
import {devices} from '../../shared/services/devices'
import {device_data} from '../../shared/services/devicedata'
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFirestore} from '@angular/fire/firestore'
import { firestore } from 'firebase/app';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  public dev_data_arr: device_data[]=[];  

  current_user:string;
  clientsId:string;
  clientsSense:string;
  clientsSenseVal:number;
  clientsVolume:number;

  dynamicVolume:number;

  dynamicColor:string

  dynamicMessage:string;

  devices_list: devices[];
  userdata: any;
  data_here:boolean = false;

  //ret_val:any;

  constructor(
    private crud_service:Crud, 
    private firestore: AngularFirestore,
    public afAuths: AngularFireAuth) { 
    var objct:any[]=[];        
  }

  isLoggedIn() {
    return this.afAuths.authState.pipe(first()).toPromise();
 }

 async doSomething() {
  const user = await this.isLoggedIn()

  if (user) {
    this.data_here = false;
    this.read();
    //this.calculate();     
    
  } else {
    // do something else
 }
}
 
  ngOnInit() { 

    this.doSomething();
  }

  doRefresh(event) {
    this.data_here = false;   //set flag to draw the blocks to false
    console.log('Begin async operation');
    this.devices_list = []; //empty device list
    this.devices_list.length=0; //empty the
    this.dev_data_arr.length = 0;
    this.read();
   
      
      setTimeout(() => {     
        //this.calculate();     
        //this.data_here = true;      
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);


  }

  calculate()
  {

    this.dev_data_arr.forEach((value)=>{
        value.dynamicVolume = (value.clientsSenseVal / value.clientsVolume) * 100
        if (value.dynamicVolume >= 65)
        {
          value.dynamicColor = "success"
          value.dynamicMessage = "Uber Cool, looks like we are A OK for use"
        }
        else if ((value.dynamicVolume > 30) && (value.dynamicVolume < 65))
        {
          value.dynamicColor = "warning"
          value.dynamicMessage = "Hmmmm ... we are still fine here, onward..."
        }
        else
        {
          value.dynamicColor = "danger"
          value.dynamicMessage = "Arrrrrrghhhh, its time to fill up, its running empty"
        }

    });
  }

  read()
  {
    this.userdata = JSON.parse(localStorage.getItem('user'));

     this.crud_service.read_linked_devices(this.userdata["uid"]).subscribe(data => {
      
      
      this.devices_list = data.data()['linked_devices']
      console.log("Devices list length",this.devices_list.length)
      this.devices_list.forEach((value)=> {
        
        this.crud_service.read_data(value['id']).subscribe(linkdata => {
          
                    console.log("subscribe in loop ",linkdata.data())
                    var temp:device_data={clientsId: linkdata.data()['Client'],
                                          clientsSense: linkdata.data()['Sense01'],
                                          clientsSenseVal: linkdata.data()['Sense01Val'],
                                          clientsVolume: linkdata.data()['Volume'],
                                          dynamicColor: "",
                                          dynamicMessage:"",
                                          dynamicVolume:25 
                                        };
                    this.dev_data_arr.push(temp); 
                    this.calculate();
                    this.data_here = true;   

        });
      });

    })
   
  }


}
