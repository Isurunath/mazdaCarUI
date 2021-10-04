import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../model/car.model';

const baseURL = 'http://localhost:8080/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.httpClient.get(`${baseURL}/getall`);
  }

  saveCar(data: Car): Observable<any> {
    return this.httpClient.post(`${baseURL}/savecar`,data);
  }

  updateCar(data: Car): Observable<any> {
    return this.httpClient.put(`${baseURL}/updatecar`,data);
  }

  getCarByID(carID: number): Observable<any> {
    return this.httpClient.get(`${baseURL}/${carID}`);
  }

  getCarByPlateID(plateID: String): Observable<any> {
    return this.httpClient.get(`${baseURL}/plate/${plateID}`);
  }
}
