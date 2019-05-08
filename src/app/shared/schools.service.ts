import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Schools } from './schools';
import { Observable, BehaviorSubject } from 'rxjs';
import { convertSnaps } from './db-util';
import { Detail } from './details';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable({providedIn: 'root'})

export class SchoolsService {

  constructor(private afs: AngularFirestore) {}

  loadAllSchools(): Observable<Schools[]> {
      // we pass the path to the data collection
    return this.afs.collection('schools',
      ref => ref.orderBy('seqNo'))
        .snapshotChanges()
          .pipe(
            map(snaps => convertSnaps<Schools>(snaps)),
            first()
            );

  }

  findSchoolByUrl(schoolUrl: string): Observable<Schools> {
    return this.afs.collection('schools',
      ref => ref.where('url', '==', schoolUrl))
        .snapshotChanges()
          .pipe(
            map(snaps => {
              const schools = convertSnaps<Schools>(snaps);
              return schools.length === 1 ? schools[0] : undefined;
            }),
            first()
          );
  }

  findSchool(courseId: string, sortOrder: OrderByDirection = 'asc',
             pageNo = 0, pageSize = 3): Observable<Detail[]> {
            return  this.afs.collection(`schools/${courseId}/details`,
                ref => ref.orderBy('seqNo', sortOrder )
                .limit(pageSize)
                .startAfter(pageNo * pageSize))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Detail>(snaps)),
        first()
      );
  }
}
