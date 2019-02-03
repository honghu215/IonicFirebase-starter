import { ChatRoomPageModule } from './chat-to-expert/chat-room/chat-room.module';
import { GroupStartPageModule } from './chat-to-expert/group-start/group-start.module';
import { GroupsPageModule } from './chat-to-expert/groups/groups.module';
import { ChatToExpertPageModule } from './chat-to-expert/chat-to-expert.module';
import { ChatToExpertPage } from './chat-to-expert/chat-to-expert.page';
import { HomePageModule } from './home/home.module';
import { EducationPageModule } from './education/education.module';
import { RecordPageModule } from './record/record.module';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SignupPageModule } from './signup/signup.module';
import { File } from '@ionic-native/file/ngx';
import { PhotographPageModule } from './photograph/photograph.module';
import { Camera } from '@ionic-native/camera/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import { LoginPageModule } from './login/login.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    PhotographPageModule,
    AngularFireModule,
    LoginPageModule,
    SignupPageModule,
    AngularFireAuthModule,
    RecordPageModule,
    AngularFireDatabaseModule,
    EducationPageModule,
    HomePageModule,
    ChatToExpertPageModule,
    GroupsPageModule,
    GroupStartPageModule,
    ChatRoomPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
