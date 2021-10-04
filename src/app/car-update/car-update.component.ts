import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carID !: number;

  public carForm!: FormGroup;
  public car!: Car;
  public duplicatePlateNo: boolean = false;
  previousPlateNo !: String;
  numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(private carService: CarService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carID = +params['id'];
    });
    this.initForm();
    this.loadFormData();
  }

  private initForm() {
    this.carForm = this.formBuilder.group({
      model: [null, [Validators.required, Validators.maxLength(15)]],
      yearManufactured: [null, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numberRegEx)]],
      color: [null, [Validators.required, Validators.maxLength(10)]],
      engineTransmission: ["auto", Validators.required],
      plateNo: [null, [Validators.required, Validators.maxLength(10)]]
    })
  }

  loadFormData() {
    this.carService.getCarByID(this.carID)
      .subscribe(
        response => {
          console.log(response);
          this.carForm = this.formBuilder.group({
            model: [response.model, [Validators.required, Validators.maxLength(15)]],
            yearManufactured: [response.yearManufactured, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numberRegEx)]],
            color: [response.color, [Validators.required, Validators.maxLength(10)]],
            engineTransmission: [response.engineTransmission, Validators.required],
            plateNo: [response.plateNo, [Validators.required, Validators.maxLength(10)]]
          })

          this.previousPlateNo = response.plateNo;
        },
        error => {
          console.log(error);
        });
  }

  onFormSubmit(): void {
    if (this.previousPlateNo != this.carForm.get('plateNo')?.value) {
      this.carService.getCarByPlateID(this.carForm.get('plateNo')?.value)
        .subscribe(
          response => {
            if (response == null) {
              this.updateCar();
            } else {
              this.duplicatePlateNo = true;
              console.log("Duplicate Plate Number");
            }
          },
          error => {
            console.log(error);
          });
    } else {
      this.updateCar();
    }
  }

  updateCar() {
    this.car = {
      id: this.carID,
      model: this.carForm.get('model')?.value,
      yearManufactured: this.carForm.get('yearManufactured')?.value,
      color: this.carForm.get('color')?.value,
      engineTransmission: this.carForm.get('engineTransmission')?.value,
      plateNo: this.carForm.get('plateNo')?.value,
    }
    console.log(this.car);

    this.carService.updateCar(this.car)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl('/carlist');
        },
        error => {
          console.log(error);
        });

  }

  back(){
    this.router.navigateByUrl('/carlist');
  }

}
