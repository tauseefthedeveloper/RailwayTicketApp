import { Component, inject,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Search, ItrainList, IStation, Customer, ApiResponse } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchData:Search = new Search();
  activateRoute=inject(ActivatedRoute);
  trainService=inject(TrainService);
  searchTrainBetweenStaion: ItrainList[]=[];
  stationList:IStation[] = [];
  selectedTrain?:ItrainList;
  passengerDetails: any = {
    'passengerName':'',
    "age":''
  }
  passengerList:any[] =[];
  loggedUserData?:Customer;
  loggedUserIn?:Customer;

  bookTicket() {
    const bookingObj = {
      "bookingId":0,
      "trainId":this.selectedTrain?.trainId,
      "passengerId":this.loggedUserData?.passengerID,
      "travelDate":this.searchData.dateOfTravel,
      "bookingDate":new Date(),
      "totalSeats":0,
      "TrainAppBookingPassengers": [] as any,
    };
    bookingObj.TrainAppBookingPassengers=this.passengerList;
    bookingObj.totalSeats=this.passengerList.length;
    this.trainService.BookTrainTicket(bookingObj).subscribe((res:ApiResponse)=>{
      const localData = localStorage.getItem('trainapp');
      if(localData != null){
        this.loggedUserIn=JSON.parse(localData);
      }
      if(this.loggedUserIn != null){
        if(res.result){
          alert("Ticket booked successfully");
        }
        else {
          alert(res.message);
        }
      }else {
      alert('Please Login!')
      }
    })
  }
  constructor () {
    const localData = localStorage.getItem('trainapp');
    if(localData != null){
      this.loggedUserData=JSON.parse(localData);
    }
    this.activateRoute.params.subscribe((res:any)=>{
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;
      this.searchData.dateOfTravel = res.dateOfTravel;
      this.getSearchTrains();
    })
  }
  departureStationN:any;
  arrivalStationN:any;
  i:any;
  getSearchTrains() {
    this.trainService.getTrainBetweenStations(this.searchData.fromStationId,this.searchData.toStationId,this.searchData.dateOfTravel).subscribe((result:any)=>{
      this.searchTrainBetweenStaion=result.data;
      for(this.i=0 ;this.i<1;this.i++){
        this.departureStationN=this.searchTrainBetweenStaion[this.i].departureStationName;
        this.arrivalStationN=this.searchTrainBetweenStaion[this.i].arrivalStationName;
      }
    })
  }
  ngOnInit(): void {
      this.loadAllStation();
  }
  loadAllStation(){
    this.trainService.getAllStations().subscribe((result:any)=>{
      this.stationList=result.data;
    })
  }

  Open(train:ItrainList){
    this.selectedTrain=train;
    const model =document.getElementById("bookmodel");
    if(model != null){
      model.style.display="block";
    }
  }
  Close(){
    const model =document.getElementById("bookmodel");
    if(model != null){
      model.style.display="none";
    }
  }

  AddPassengers(){
    const strObj=JSON.stringify(this.passengerDetails);
    const parseObj=JSON.parse(strObj)
    this.passengerList.push(parseObj);
    this.passengerDetails= {
      'id':0,
      'passengerName':'',
      "age":''
    }
  }
  removePassenger(item:any){
    this.passengerList.pop();
  }
}
