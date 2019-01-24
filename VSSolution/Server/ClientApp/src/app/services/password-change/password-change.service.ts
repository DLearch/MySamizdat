import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable()
export class PasswordChangeService {

  private readonly changeController: string = 'passwordchange';

  constructor(
    private api: ApiService
  ) { }

  public change(data: any): Observable<any> {
    
    return this.api
      .post(data, this.changeController);
  }
}
