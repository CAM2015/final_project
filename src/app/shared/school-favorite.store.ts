import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Schools } from './schools';

@Injectable()
export class FavoriteStore {
  // tslint:disable-next-line:variable-name
  private  _favSchoolSubject = new BehaviorSubject({});

  constructor(private storage: Storage) {
    this.initialData();
  }

  get favSchools(): Observable<any>  {
    return this._favSchoolSubject.asObservable();
  }

  private initialData() {
    this.storage.get('favSchools').then(
    (favSchools) => {
        this._favSchoolSubject.next(favSchools || {});
        const a = this._favSchoolSubject.getValue();

        console.log('data/favSchools', favSchools);
        console.log('a', a);
    });
  }

  // grabs the school, checks if already favorite => saves it as next comment explains
  public toggleSchool(school: Schools) {
    const favSchools = this._favSchoolSubject.getValue();
    if (school.favorite) {
      school.favorite = false;
      delete favSchools[school.seqNo];
    } else {
      school.favorite = true;
      favSchools[school.seqNo] = school;
    }
    // save the school under a [(key of 'favSchools'), and second argument is the (value 'this.favSchools')], to ionic storage
    this.storage.set('favSchools', favSchools).then(() => {
      this._favSchoolSubject.next(favSchools);
    });
  }


}
