import { Component} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
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

  constructor(private favoriteStore: FavoriteStore) {}

   ionViewWillEnter() {
    // stores/subscribes to our favorite schools
    console.log('LOG FROM CONSTRUCTOR');
    this.favSchoolSub = this.favoriteStore.favSchools.subscribe(
      (favSchools: any) => {
        console.log('INSIDE OF SUBSCRIBE IN FAVORITE PAGE!!!');
        this.favSchoolsList = this.getFavoriteSchoolList(favSchools);
        console.log('  this.favSchoolsList',   this.favSchoolsList);
      });
  }


   // unsubscribe from favorite schools
   ionViewDidLeave() {
    if (this.favSchoolSub && !this.favSchoolSub.closed) {
      this.favSchoolSub.unsubscribe();
    }
  }

   // transforms favSchool object to favorite card list
    // gets every seqNo/id/key of every school object, loops over and just filters and gets the school,
      // returns the list and assigns to favSchoolsList
  private getFavoriteSchoolList(favSchools: any): Schools[] {
    if (favSchools) {
      return Object.keys(favSchools)
        .filter(seqNo => favSchools[seqNo])
        .map(seqNo => favSchools[seqNo]);
    }
    // returns the alist, which is assigned to favSchoolsList
    return [];
   }

}
