import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({});
  @Output() onFormSubmit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null),
    });
  }

  public onSubmit() {
    if(this.searchForm.value) {
      this.onFormSubmit.emit(this.searchForm.value.searchInput);
    }
  }
}
