import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
  public title: string = 'Some message';
  public message: string = 'Description';
  constructor() { }

  ngOnInit(): void {
  }

  public fillData(title: string, message: string) {
    this.title = title;
    this.message = message;
  }

}
