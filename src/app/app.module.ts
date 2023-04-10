import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { GuestModule } from './modules/guest/guest.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ToastComponent } from './components/toast/toast.component';
import { CoreAnimationDirectiveDirective } from './directives/core-animation-directive.directive';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AuthLayoutComponent,
    ToastComponent,
    CoreAnimationDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    GuestModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
