import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @Input() public name: string = '';
  @Input() public price: string = '';
  @Input() public description: string = '';
  @Input() public tags: string[] = [];
  @Input() public img: string = '';
}
