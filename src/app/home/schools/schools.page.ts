import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Schools } from '../../shared/schools';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { SchoolsService } from '../../shared/schools.service';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FavoriteStore } from '../../shared/school-favorite.store';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {
  isLoading = false;
  favSchools: any = {};
  favSchoolSub: Subscription;
  loader: any;

  segment = 'primarySchool';
  school: Schools[];
  loadedPrimarySchools: any[];
  primaryGoalList: any[];
  primarySub: Subscription;

  loadedSecondarySchools: any[];
  secondaryGoalList: any[];
  secondarySub: Subscription;

  constructor(public loadingController: LoadingController,
              private toast: ToastService,
              private firebase: Firebase,
              private favoriteStore: FavoriteStore,
              private afs: AngularFirestore,
              private menuCtrl: MenuController) {
        // stores our favorite schools
        this.favSchoolSub = this.favoriteStore.favSchools.subscribe(
                (favSchools: any) => {
                  this.favSchools = favSchools;
        });
               }

  async presentLoading() {
    const loader = await this.loadingController.create({
      spinner: null,
      duration: 3500,
      message: 'Loading...',
      translucent: true,
    });
    return await loader.present();
  }

 ngOnInit() {
      this.loader = this.presentLoading();
     // we get schools from observable through this subscribe
      this.primarySub = this.afs.collection('primary').valueChanges().subscribe(primaryData => {
      this.primaryGoalList = primaryData;
      // back-up data array
      this.loadedPrimarySchools = this.primaryGoalList;
      console.log('primaryGoalList', this.primaryGoalList);
    });
      // we get schools from observable through this subscribe
      this.secondarySub = this.afs.collection('secondary').valueChanges().subscribe(secondaryData => {
        this.secondaryGoalList = secondaryData;
        // back-up data array
        this.loadedSecondarySchools = this.secondaryGoalList;

        console.log('loadedSecondarySchools', this.loadedSecondarySchools);
    });
  }

  ionViewDidLeave() {
    if (this.favSchoolSub && !this.favSchoolSub.closed) {
      this.favSchoolSub.unsubscribe();
    }
  }

  // checks if the school is already favorite
  isSchoolFavorite(seqNo: number): boolean {
    const school = this.favSchools[seqNo];
    return school ? true : false;
  }

    // initialize the back-up data array
  initializePrimary(): void {
    this.primaryGoalList = this.loadedPrimarySchools;
  }
  initializeSecondary(): void {
    this.secondaryGoalList = this.loadedSecondarySchools;
  }

  filterPrimaryList(evt) {
    // the list is initilized everytime there is a key stroke on the search bar
    this.initializePrimary();
    // search term is what user types
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) { return; }
      // loop throuh the back-up data, check if both, what we look for and what is typed is there
    this.primaryGoalList = this.primaryGoalList.filter(currentGoal => {
      if (currentGoal.name && searchTerm
          || currentGoal.address1 && searchTerm
          || currentGoal.address2 && searchTerm
          || currentGoal.address3 && searchTerm
          || currentGoal.mixed_Status && searchTerm
          || currentGoal.fee_paying && searchTerm
          || currentGoal.completion_Prog && searchTerm
         ) {
        if ((currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address1.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address2.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address3.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.mixed_Status.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.fee_paying.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.completion_Prog.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
          ) {
            // returns an item if a match is certain
            return true;
        }
        return false;
      }
    });
  }

  filterSecondaryList(evt) {
    // the list is initilized everytime there is a key stroke on the search bar
    this.initializeSecondary();
    // search term is what user types
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) { return; }
      // loop throuh the back-up data, check if both, what we look for and what is typed is there
    this.secondaryGoalList = this.secondaryGoalList.filter(currentGoal => {
      if (currentGoal.name && searchTerm
          || currentGoal.address1 && searchTerm
          || currentGoal.address2 && searchTerm
          || currentGoal.address3 && searchTerm
          || currentGoal.mixed_Status && searchTerm
          || currentGoal.fee_paying && searchTerm
          || currentGoal.completion_Prog && searchTerm
         ) {
        if ((currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address1.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address2.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.address3.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.mixed_Status.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.fee_paying.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
            || (currentGoal.completion_Prog.toLowerCase().indexOf(searchTerm.toLowerCase())  > -1)
          ) {
            // returns an item if a match is certain
            return true;
        }
        return false;
      }
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  favoriteSchool(school: Schools) {
    this.favoriteStore.toggleSchool(school);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.primarySub ) {
      this.primarySub.unsubscribe();
    }
    if (this.secondarySub) {
      this.secondarySub.unsubscribe();
    }
  }
}
