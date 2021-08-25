import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  @Input() public isPageLoading: boolean = true;

  public toggleLoadingStatus(status: boolean) {
    if(status) this.isPageLoading = status;
    setTimeout(() => this.isPageLoading = status, 1000);
  }
}
