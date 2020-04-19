import { Component, OnInit , ViewChild} from '@angular/core';
import { AngularFireList} from '@angular/fire/database';
import { Chart } from 'chart.js';
import {Crud} from '../../shared/services/crud'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  
  ref: AngularFireList<any>;

  val_arr:number[] = [];
  time_arr:any[] = [];
  arr_cnt:number = 0;

  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"] 
  data2: [12, 19, 3, 5, 2, 3]
  
  data: Observable<any[]>;

  @ViewChild('lineChart') lineChart;

  bars: any;
  valueBarsChart: any;
  colorArray: any;
  chartData = null;

  constructor(private crud_service:Crud) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.read_historical();
    
  }


  read_historical(){

    var n_data_arr = [];
    var n_labels_arr = [];

    var result =  this.crud_service.read_hist_data('IpGvAMwKPTwCcPZJQahA').subscribe(data =>{

        data.query.orderBy("timestamp").get().then(snapshot => {
        console.log("Snapshot value", snapshot.size);
        snapshot.forEach(doc=> {
          console.log(doc.id, ' => ', doc.data);
          var new_data = doc.data();
          var valuez = new_data.data;
          var timing = new_data.timestamp;
          var timimgz = new Date(timing * 1000);
          this.val_arr.push(valuez)
          this.time_arr.push(timimgz.toDateString())
          console.log(timimgz.toDateString());
          console.log("Retrieved data from firestore: ",valuez,timimgz );
          //this.val_arr[this.arr_cnt] = new_data.data;
          //this.time_arr[this.arr_cnt++] = timimgz.toLocaleDateString();
          console.log("counter ",this.arr_cnt );
          if (this.chartData) {
            this.updateCharts(this.val_arr, this.time_arr)
          } else {
            this.createBarChart(this.val_arr, this.time_arr)
          }
          
        });

      });      
      
      console.log("This is after the subscribe");
     })
   
  }

  createBarChart(data_list, time_list){

    //this.read_historical();
    console.log("chartdata", this.val_arr)
    console.log("chartdata", this.time_arr)
    this.valueBarsChart = new Chart(this.lineChart.nativeElement, {

      type: 'bar',
      data: {
        labels:time_list,
        datasets: [{
          label: 'Usage History',
          data: data_list,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1                    
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }      
    });
  }

  updateCharts(data_list, timing_list) {
    this.chartData = data_list;
    let chartData = this.read_historical();
  
    // Update our dataset

    this.valueBarsChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData
    });
    this.valueBarsChart.update();
  }

}

