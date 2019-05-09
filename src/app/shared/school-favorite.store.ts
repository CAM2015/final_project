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
        this._favSchoolSubject.next(favSchools);
        const a = this._favSchoolSubject.getValue();
        console.log('data/favSchools', favSchools);
        console.log('a', a);
    });
  }

  public toggleSchool(school: Schools) {
      const favSchools = this._favSchoolSubject.getValue();
      if (school.favorite) {
        // removes favorites schools
        school.favorite = false;
        delete favSchools[school.seqNo];
      } else {
        // adds schools to favorite
        school.favorite = true;
        favSchools[school.seqNo] = school;
      }
      // saves the favourite schools to the ionic storage
      this.storage.set('favSchools', favSchools).then( () => {
          this._favSchoolSubject.next(favSchools);
      });
      console.log('set FavSchools : ' + this.favSchools);
  }
}

