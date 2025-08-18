import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule, MatDialogModule, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game?: Game;
  firestore: Firestore = inject(Firestore);
  item$!: Observable<DocumentData | undefined>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items')
  }


ngOnInit(): void {
  this.newGame();
  this.route.params.subscribe((params) => {
    const gameId = params['id'];
    console.log('Game ID:', gameId);

    const gameDoc = doc(this.firestore, `games/${gameId}`);
    this.item$ = docData(gameDoc, { idField: 'id' });

    this.item$.subscribe((game: any) => {
      console.log('game update',game)
      this.game!.currentPlayer = game.currentPlayer;
      this.game!.playedCars = game.playedCars;
      this.game!.players = game.players;
      this.game!.stack = game.stack;
    });
  });
}

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game!.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        this.game!.currentPlayer++
        this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length

        setTimeout(() => {
          this.game!.playedCars.push(card);
          this.pickCardAnimation = false;
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
      }
    });
  }
}
