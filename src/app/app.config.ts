import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-dfa15","appId":"1:744958101009:web:32d014ab7cf37977b493b0","storageBucket":"ringoffire-dfa15.firebasestorage.app","apiKey":"AIzaSyAyovpWs3FVrZ04FDSLslBui248pQ4vMxw","authDomain":"ringoffire-dfa15.firebaseapp.com","messagingSenderId":"744958101009"})), provideFirestore(() => getFirestore())]
};
