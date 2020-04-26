import { Component, OnInit } from '@angular/core';
import {Crud} from '../../shared/services/crud'
import {devices} from '../../shared/services/devices'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  devices_list: devices[];
  userdata: any;

  constructor(private crud_service:Crud) { }

  ngOnInit() {

    this.userdata = JSON.parse(localStorage.getItem('user'));
    console.log("unstringed json", this.userdata, this.userdata["uid"]);

    this.crud_service.read_linked_devices(this.userdata["uid"]).subscribe(data => {

      this.devices_list = data.data()['linked_devices']
    })
    /*
    var docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      arrayExample: [5, true, "hello"],
      nullExample: null,
      objectExample: {
          a: 5,
          b: {
              nested: "foo"
          }
      }*/



  }


  add_device_alias(device, alias)
  {
 
    const stuff: devices = {
      id: device,
      name:alias
    }

   this.crud_service.create_object(stuff);
   this.refresh_read();
  }

  delete_linked(device, alias)
  {
    const stuff: devices = {
      id: device,
      name:alias
    }
    this.crud_service.delete_linked_device(stuff);
    this.refresh_read();
  }

  refresh_read()
  {
    this.crud_service.read_linked_devices(this.userdata["uid"]).subscribe(data => {

      this.devices_list = data.data()['linked_devices']

    })
  }
}
