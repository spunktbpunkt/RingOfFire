import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game?: Game;

  constructor() { }

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
          this.game!.playedCars .push(card);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }
}
