import { Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import { IStation } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  router =inject(Router);
  trainService =inject(TrainService);
  stationList:IStation[] = [];
  fromStationId:number =0;
  toStationId:number =0;
  dateOfTravel: string ='';

  ngOnInit(): void {
      this.loadAllStation();
  }
  loadAllStation(){
    this.trainService.getAllStations().subscribe((result:any)=>{
      this.stationList=result.data;
    })
  }
  onSerach(){
    if(this.fromStationId==0 || this.dateOfTravel=='' || this.toStationId==0){
      alert('Please select the correct journey details!')
    }
    else{
      if(this.fromStationId==this.toStationId){
        alert('Please select a different destination Station!')
      }
      else {
        this.router.navigate(['/search',this.fromStationId,this.toStationId,this.dateOfTravel])
      }
    }
  }
}
