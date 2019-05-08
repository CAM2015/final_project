import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Schools } from '../../shared/schools';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { SchoolsService } from '../../shared/schools.service';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {
  isLoading = false;
  // schools: Observable<Schools[]>;
  // primary: Observable<Schools[]>;
  // secondary: Observable<Schools[]>;
  segment = 'two';
  loadedPrimarySchools: any[];
  primaryGoalList: any[];
  primarySub: Subscription;

  loadedSecondarySchools: any[];
  secondaryGoalList: any[];
  secondarySub: Subscription;


  constructor(private service: SchoolsService,
              private afs: AngularFirestore,
              private menuCtrl: MenuController) { }

  ngOnInit() {
     // we get schools from observable through this subscribe
      this.primarySub = this.afs.collection('primary').valueChanges().subscribe(primaryData => {
      this.primaryGoalList = primaryData;
      // back-up data array
      this.loadedPrimarySchools = this.primaryGoalList;
      console.log('primaryGoalList', this.primaryGoalList);


      this.secondarySub = this.afs.collection('secondary').valueChanges().subscribe(secondaryData => {
        this.secondaryGoalList = secondaryData;
        this.loadedSecondarySchools = this.secondaryGoalList;
        console.log('loadedSecondarySchools', this.loadedSecondarySchools);
      });
    });


    // this.isLoading = true;
    //   // query for retrieving a collection from firestore; Using Angular Fire APIs
    // this.schools = this.service.loadAllSchools();
    // this.isLoading = false;
    // console.log('this.schools', this.schools);


    // this.primary = this.schools.pipe(
    //   map(s => s.filter(
    //     schools => schools.school_Level.includes('Primary'))));
    // // console.log('this.primary', this.primary);

    // this.secondary = this.schools.pipe(
    //   map(s => s.filter(
    //     schools => schools.school_Level.includes('Secondary'))));
    // // console.log('this.secondary', this.secondary);

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
