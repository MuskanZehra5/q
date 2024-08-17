import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddQrcodeComponent } from './components/add-qrcode/add-qrcode.component';
import { QrcodeDetailsComponent } from './components/qrcode-details/qrcode-details.component';
import { QrcodesListComponent } from './components/qrcodes-list/qrcodes-list.component';
import { FetchcodesComponent } from './components/fetchcodes/fetchcodes.component';
import { VerifyCodesComponent } from './components/verify-codes/verify-codes.component';
import { SearchComponent } from './components/search/search.component';
import { PopupComponent } from './components/sharedcomponents/popup/popup.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { SigninComponent } from './Authentication/signin/signin.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { SpinnerComponent } from './components/sharedcomponents/spinner/spinner.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    QrcodeDetailsComponent,
    QrcodesListComponent,
    AddQrcodeComponent,
    FetchcodesComponent,
    VerifyCodesComponent,
    SearchComponent,
    PopupComponent,
    SignupComponent,
    SigninComponent,
    OrganizationComponent,
    SpinnerComponent, 
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"qrcode-e14b3","appId":"1:1003589667988:web:eb35f0fbe3b06e74e23881","databaseURL":"https://qrcode-e14b3-default-rtdb.firebaseio.com","storageBucket":"qrcode-e14b3.appspot.com","apiKey":"AIzaSyAVzzxVKXe-VrEAGPBi4SMlDvkES_S2SLw","authDomain":"qrcode-e14b3.firebaseapp.com","messagingSenderId":"1003589667988","measurementId":"G-DH98Z1SQZQ"})),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
