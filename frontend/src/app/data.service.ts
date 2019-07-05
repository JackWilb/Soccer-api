import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPlayers() {
  	return this.http.get("http://24.10.255.47:5000/players/")
  }
}
