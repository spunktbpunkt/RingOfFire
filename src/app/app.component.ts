import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyovpWs3FVrZ04FDSLslBui248pQ4vMxw",
  authDomain: "ringoffire-dfa15.firebaseapp.com",
  projectId: "ringoffire-dfa15",
  storageBucket: "ringoffire-dfa15.firebasestorage.app",
  messagingSenderId: "744958101009",
  appId: "1:744958101009:web:51844f4d31972ac8b493b0"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}
