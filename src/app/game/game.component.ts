import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game?: Game;

  constructor(private dialog: MatDialog) {}


  ngOnInit(): void {
    this.newGame();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game!.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        console.log('new card: ' + card);
        console.log(this.game);

        setTimeout(() => {
          this.game!.playedCars.push(card);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if (result !== undefined) {
  //     }
  //   });
  // }
    openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game!.players.push(name);
        console.log('Players:', this.game!.players);
      }
    });
  }
}
