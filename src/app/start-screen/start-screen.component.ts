import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router){}

  async newGame() {
    // START GAME
    let game = new Game();

    // REFERENZ ZUR COLLECTION "GAME"
    let gamesCollection = collection(this.firestore,'games')

    // DOKUMENT HINZUFÜGEN
    let docRef = await addDoc(gamesCollection, game.toJson())

    // ZUR SPIELROUTE MIT ID FÜHREN
    this.router.navigateByUrl(`/game/${docRef.id}`);
  }

}