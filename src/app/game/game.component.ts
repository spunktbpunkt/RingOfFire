import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  items$: Observable<any[]>;

  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }


  ngOnInit(): void {
    this.newGame();
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

  newGame() {
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
