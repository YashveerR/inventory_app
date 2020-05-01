import { Component, OnInit , ViewChild} from '@angular/core';
import { AngularFireList} from '@angular/fire/database';
import { Chart } from 'chart.js';
import {Crud} from '../../shared/services/crud'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';

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

  doc_id:string;
  product_id: string;
  constructor(private crud_service:Crud,    
    private route: ActivatedRoute) { 

      this.product_id = this.route.snapshot.params.id;
      console.log("route parameter",  this.product_id );
    }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.read_historical();
    
  }


  read_historical(){

    var n_data_arr = [];
    var n_labels_arr = [];

    var result =  this.crud_service.read_hist_data(this.product_id).subscribe(data =>{

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
          if (this.chartData) {
            this.updateCharts(this.val_arr, this.time_arr)
          } else {
            this.createBarChart(this.val_arr, this.time_arr)
          }
          
        });

      });      
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

