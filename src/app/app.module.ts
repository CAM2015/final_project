import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { FavoriteStore } from './shared/school-favorite.store';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './shared/fcm.service';
import { ToastService } from './shared/toast.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    // IonicStorageModule.forRoot({
    //   name: '__mydb',
    //   driverOrder: ['indexeddb', 'sqlite', 'websql']
    // }),
    AngularFireModule.initializeApp(environment.firebase, 'sss'),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    Firebase,
    FavoriteStore,
    FcmService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
