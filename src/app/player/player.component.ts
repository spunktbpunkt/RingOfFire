import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
 @Input()name!:string;
 @Input()playerActive: boolean = false;
 @Input() image: string = '1.webp';
}
