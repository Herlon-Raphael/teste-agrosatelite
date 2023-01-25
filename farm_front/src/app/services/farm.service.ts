import { Injectable } from '@angular/core'
import { Farm } from './../models/Farm'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Owner } from '../models/Owner'
import { Observable, throwError } from 'rxjs'
import { tap, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private readonly api = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) {}
  
  create(farm: Farm) {
    return this.httpClient.post<Farm>(this.api + '/farms', farm)
  }

  async read(id: number) {
    try {
      const farm = await this.httpClient.get<Farm>(`${this.api}/farms/${id}`).toPromise()
      return farm
    } catch (e) {
      console.log(e)
    }
  }

  async editFarm(id, farm) {
    try {
      const edit = await this.httpClient.patch<Farm>(`${this.api}/farms/${id}`, farm).toPromise()
      return alert(`A fazenda ${farm.name} foi editada com sucesso`)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteFarm(id: number) {
    await this.httpClient.delete<Farm>(`${this.api}/farms/${id}`).toPromise()
    return alert('Fazenda deletada')
  }

  list() {
    return this.httpClient.get<Farm[]>(this.api + '/farms')
  }

  async readOwner(id: number) {
    try {
      const owner = await this.httpClient.get<Owner>(`${this.api}/owners/${id}`).toPromise()
      if (owner) {
        return owner
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  }
