import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({});
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Output() public onFormSubmit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null),
    });
  }

  public onSubmit() {
    const {value: formValue} = this.searchForm;

    if(formValue) this.onFormSubmit.emit(formValue.searchInput);
  }
}
