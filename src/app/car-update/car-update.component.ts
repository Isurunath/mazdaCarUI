import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  @Input() carID !: number;

  public carForm!: FormGroup;
  public car!: Car;

  constructor(private carService: CarService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadFormData();
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

  loadFormData() {
    this.carService.getCarByID(this.carID)
      .subscribe(
        response => {
          console.log(response);
          this.carForm = this.formBuilder.group({
            model: [response.model],
            yearManufactured: [response.yearManufactured],
            color: [response.color],
            engineTransmission: [response.engineTransmission],
            plateNo: [response.plateNo]
          })
        },
        error => {
          console.log(error);
        });
  }

  onFormSubmit(): void {
    this.car = {
      id:this.carID,
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
        },
        error => {
          console.log(error);
        });
  }

}
