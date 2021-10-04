import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  public carForm!: FormGroup;
  public car!: Car;
  public duplicatePlateNo: Boolean = false;
  numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.duplicatePlateNo = false;
    this.carForm = this.formBuilder.group({
      model: [null, [Validators.required, Validators.maxLength(15)]],
      yearManufactured: [null, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numberRegEx)]],
      color: [null, [Validators.required, Validators.maxLength(10)]],
      engineTransmission: ["auto", Validators.required],
      plateNo: [null, [Validators.required, Validators.maxLength(10)]]
    })
  }

  //On save button click
  onFormSubmit(): void {
    this.car = {
      model: this.carForm.get('model')?.value,
      yearManufactured: this.carForm.get('yearManufactured')?.value,
      color: this.carForm.get('color')?.value,
      engineTransmission: this.carForm.get('engineTransmission')?.value,
      plateNo: this.carForm.get('plateNo')?.value,
    }

    console.log(this.car);
    //check plate number already exist in DB
    this.carService.getCarByPlateID(this.car.plateNo)
      .subscribe(
        response => {
          if (response == null) {
            this.carService.saveCar(this.car)
              .subscribe(
                response => {
                  this.initForm();
                  this.router.navigateByUrl('/carlist');
                },
                error => {
                  console.log(error);
                });
          } else {
            this.duplicatePlateNo = true;
            console.log("Duplicate Plate Number");
          }
        },
        error => {
          console.log(error);
        });
  }

}
