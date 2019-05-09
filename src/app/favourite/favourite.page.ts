import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoriteStore } from '../shared/school-favorite.store';
import { Schools } from '../shared/schools';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage {
  favSchoolSub: Subscription;
  favSchoolsList: Schools[] = [];

  constructor(private favoriteStore: FavoriteStore) {
    // stores our favorite schools
    this.favSchoolSub = this.favoriteStore.favSchools.subscribe(
      (favSchools: any) => {
        this.favSchoolsList = this.getFavoriteSchoolList(favSchools);
        console.log('  this.favSchoolsList',   this.favSchoolsList);
});
   }

  ionViewDidLeave() {
    if (this.favSchoolSub && !this.favSchoolSub.closed) {
      this.favSchoolSub.unsubscribe();
    }
  }

  // transforms favorite card object to favorite card list
  // gets every id of every school object, lops over and just filters and gets the school, 
  // returns the list and assigns to favSchoolsList
   private getFavoriteSchoolList(favSchools: any): Schools[] {
    if (favSchools) {
      return Object.keys(favSchools)
        .filter(key => favSchools[key])
        .map(key => favSchools[key]);
    }
    return [];
   }
}