import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnChanges{
    cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ]

  title:string = '';
  description:string = ''
  @Input()card?:string='';
  constructor() {}

  ngOnInit(): void {
    
  }
  
ngOnChanges(): void {
  console.log('current Card: ' + this.card);

  if (!this.card) {
    return; // nichts tun, wenn noch keine Karte gesetzt ist
  }

  const parts = this.card.split('_');
  if (parts.length < 2) {
    return; // falls der String nicht im Format "suit_number" ist
  }

  const cardNumber = +parts[1];
  if (isNaN(cardNumber) || cardNumber < 1 || cardNumber > this.cardAction.length) {
    return; // ungültige Kartennummer
  }

  this.title = this.cardAction[cardNumber - 1].title;
  this.description = this.cardAction[cardNumber - 1].description;
}

}
