import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TrainService } from './service/train.service';
import { ApiResponse, Customer, loginPassenger } from './model/train';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Railway-Ticket-Booking';
  registerObj:Customer= new Customer();
  loginObj:loginPassenger= new loginPassenger();
  trainService=inject(TrainService);
  loggedUser:Customer = new Customer();

  constructor(){
    const localDataUser=localStorage.getItem('trainapp');
    if(localDataUser != null){
      this.loggedUser=JSON.parse(localDataUser);
    }
  }

  openRegister(){
    const model =document.getElementById("registerModel");
    if(model != null){
      model.style.display="block";
    }
  }
  closeRegister(){
    const model =document.getElementById("registerModel");
    if(model != null){
      model.style.display="none";
    }
  }
  RegisterPassenger(){
    this.trainService.addUpdatePassendger(this.registerObj).subscribe((res:ApiResponse)=>{
      if(res.result){
        alert("Registration success");
        this.closeRegister();
      }
      else{
        alert(res.message);
      }
    });
  }

  LoginPassenger() {
    this.trainService.loginPassengerDetails(this.loginObj).subscribe((res:ApiResponse)=>{
      if( res.result){
        alert("Login successfull");
        localStorage.setItem('trainapp',JSON.stringify(res.data));
        this.loggedUser=res.data;
        this.closeLogin();
      }
      else {
        alert(res.message);
      }
    })
  }
  openLogin(){
    const model =document.getElementById("loginModel");
    if(model != null){
      model.style.display="block";
    }
  }
  closeLogin(){
    const model =document.getElementById("loginModel");
    if(model != null){
      model.style.display="none";
    }
  }

  onLogout(){
    this.loggedUser = new Customer();
    localStorage.removeItem('trainapp');
  }
}
