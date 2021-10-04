import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCarList();
  }

  public carList: Car[] = [];

  getCarList(): void {
    this.carService.getAllCars()
      .subscribe(
        data => {
          this.carList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCar(carID:any){
    this.router.navigate(['/carupdate',carID]);
  }
}
