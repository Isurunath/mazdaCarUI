import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private carService: CarService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.carForm = this.formBuilder.group({
      model: [null],
      yearManufactured: [null],
      color: [null],
      engineTransmission: [null],
      plateNo: [null]
    })
  }



  onFormSubmit(): void {
    this.car = {
      model : this.carForm.get('model')?.value,
      yearManufactured : this.carForm.get('yearManufactured')?.value,
      color : this.carForm.get('color')?.value,
      engineTransmission : this.carForm.get('engineTransmission')?.value,
      plateNo : this.carForm.get('plateNo')?.value,
    }

    console.log(this.car);

    this.carService.saveCar(this.car)
      .subscribe(
        response => {
          console.log(response);
          this.initForm();
        },
        error => {
          console.log(error);
        });
  }

}
