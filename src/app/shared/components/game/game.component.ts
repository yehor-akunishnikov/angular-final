import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() public name: string = '';
  @Input() public price: string = '';
  @Input() public description: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
