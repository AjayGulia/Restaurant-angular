import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantData } from '../resturant.modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {

  allRestaurantData:any
  formValue!:FormGroup
  restaurantObj: RestaurantData= new RestaurantData;
  showAdd!:boolean
  showEdit!:boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router ) { }

  ngOnInit(): void {

    this.formValue= this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })

    this.getRestaurantData();
  }

  clickAddRestaurant(){
    this.formValue.reset()
    this.showAdd=true
    this.showEdit=false
  }


  addRestaurant(){

    this.restaurantObj.name= this.formValue.value.name;
    this.restaurantObj.email= this.formValue.value.email;
    this.restaurantObj.address= this.formValue.value.address;
    this.restaurantObj.mobile= this.formValue.value.mobile;
    this.restaurantObj.services= this.formValue.value.services;

    this.api.postRestaurant(this.restaurantObj).subscribe(res=>{
      console.log(res);
      alert("restaurant details added")
      this.formValue.reset()
      this.getRestaurantData();
    },
    err=>{
      alert("Not Added Erorr")
    }
    )
  }

  getRestaurantData(){

    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
    })
  }


  delRestaurant(data:any){
     this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurant Record Deleted");
      this.getRestaurantData();
     },
     err=>{
      alert("Not deleted Erorr")
    }
     )
  }



  editRestaurant(data:any){
    this.showAdd=false
    this.showEdit=true
    this.restaurantObj.id=data.id;
     this.formValue.controls['name'].setValue(data.name);
     this.formValue.controls['email'].setValue(data.email);
     this.formValue.controls['address'].setValue(data.address);
     this.formValue.controls['mobile'].setValue(data.mobile);
     this.formValue.controls['services'].setValue(data.services);

  }

  upRestaurant(){
    this.restaurantObj.name= this.formValue.value.name;
    this.restaurantObj.email= this.formValue.value.email;
    this.restaurantObj.address= this.formValue.value.address;
    this.restaurantObj.mobile= this.formValue.value.mobile;
    this.restaurantObj.services= this.formValue.value.services;

    this.api.UpdateRestaurant(this.restaurantObj, this.restaurantObj.id).subscribe(res=>{
      alert("Restaurant Record updated");
      this.formValue.reset();
      this.getRestaurantData();
     },
     err=>{
      alert("Not Updated Erorr")
    }
     )
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login'])
  }
}
