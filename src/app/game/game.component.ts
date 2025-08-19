import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, setDoc, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, PlayerComponent, PlayerMobileComponent, GameInfoComponent, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game?: Game;
  firestore: Firestore = inject(Firestore);
  item$!: Observable<DocumentData | undefined>;
  gameId: string = '';

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items')
  }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('Game ID:', this.gameId);

      const gameDoc = doc(this.firestore, `games/${this.gameId}`);
      this.item$ = docData(gameDoc, { idField: 'id' });

      this.item$.subscribe((game: any) => {
        console.log('game update', game)
        this.game!.currentPlayer = game.currentPlayer;
        this.game!.playedCards = game.playedCards;
        this.game!.players = game.players;
        this.game!.player_images = game.player_images;
        this.game!.stack = game.stack;
        this.game!.pickCardAnimation = game.pickCardAnimation;
        this.game!.currentCard = game.currentCard;
      });
    });
  }

  async saveGame() {
    if (!this.game) return;

    // bestehendes Dokument referenzieren
    const gameDoc = doc(this.firestore, `games/${this.gameId}`);

    // das Dokument mit dem aktuellen Spielzustand überschreiben
    await setDoc(gameDoc, this.game.toJson());
    console.log('Spiel gespeichert in bestehendem Dokument:', this.gameId);
  }

  async takeCard() {
    if (!this.game) return;
    if (!this.game.pickCardAnimation) {
      const card = this.game!.stack.pop();
      if (card !== undefined) {
        this.game.currentCard = card;
        this.game.pickCardAnimation = true;
        console.log(this.game.pickCardAnimation)
        this.game!.currentPlayer++
        this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length
        await this.saveGame();


        setTimeout(() => {
          this.game!.playedCards.push(card);
          this.game!.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
      }
    }
  }

  async newGame() {
    this.game = new Game();
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game!.players.push(name);
        this.game!.player_images.push('1.webp');
        this.saveGame();
      }
    });
  }

editPlayer(playerId: number) {
  console.log('Edit Player', playerId);
  const dialogRef = this.dialog.open(EditPlayerComponent);

  dialogRef.afterClosed().subscribe((change: string) => {
    console.log('Received change', change);
    
    // Überprüfe erst, ob game und das Array existieren
    if (this.game && this.game.player_images && change) {
      this.game.player_images[playerId] = change;
      this.saveGame();
    }
  });
}




}
