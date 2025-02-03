import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Puppy {
  status: string;
  petType: string;
  id: string;
  name: string;
  breed: string;
  color: string;
  location: string;
  gender: string;
  dob: string;
  refId: string;
  image: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})

export class PuppyService {
  private apiUrl = 'http://localhost:3000/api/puppies';

  constructor(private http: HttpClient) {}

  getPuppies(filters?: { [key: string]: string }): Observable<Puppy[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<Puppy[]>(this.apiUrl, { params });
  }
  getPuppy(refId: string): Observable<Puppy> {
    return this.http.get<Puppy>(`${this.apiUrl}/${refId}`);
  }
}
