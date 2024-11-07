import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Customer, loginPassenger } from '../model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  apiUrl:string ='https://freeapi.miniprojectideas.com/api/TrainApp/';
  allstations:any;
  constructor( private http: HttpClient) { }
  getAllStations(){
    return this.http.get(`${this.apiUrl}GetAllStations`);
  }
  getTrainBetweenStations(from:number,to:number,date:string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
  }
  addUpdatePassendger(obj:Customer){
    return this.http.post<ApiResponse>(`${this.apiUrl}AddUpdatePassengers`,obj);
  }
  loginPassengerDetails(obj:any){
    return this.http.post<ApiResponse>(`${this.apiUrl}Login`,obj);
  }
  BookTrainTicket(obj:any){
    return this.http.post<ApiResponse>(`${this.apiUrl}BookTrain`,obj);
  }
}
