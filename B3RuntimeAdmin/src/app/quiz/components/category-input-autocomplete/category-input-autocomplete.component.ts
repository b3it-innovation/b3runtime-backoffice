import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'app/quiz/model/category.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-category-input-autocomplete',
  templateUrl: './category-input-autocomplete.component.html',
  styleUrls: ['./category-input-autocomplete.component.scss']
})
export class CategoryInputAutocompleteComponent implements OnInit {

  @Input()
  categories: Category[] = [];

  @Output()
  selectedCategory = new EventEmitter<string>();

  filteredCategories: Observable<Category[]>;
  categoryNameFormControl = new FormControl();


  ngOnInit() {
    this.registerCategoryFilterLogic();
    this.registerSendToParentEvents();
    console.log('när körs detta ')
  }

  private registerCategoryFilterLogic() {
    this.filteredCategories = this.categoryNameFormControl.valueChanges
      .startWith(null)
      .map(categoryNameFormValue => categoryNameFormValue ? this.getCategoriesContainingString(categoryNameFormValue) : this.categories.slice());
  }

  private getCategoriesContainingString(categoryName: string): Category[] {
    return this.categories.filter((category) => category.name.includes(categoryName.toLowerCase()));
  }

  private registerSendToParentEvents() {
    this.categoryNameFormControl.valueChanges.subscribe(value => this.sendValuesToParent(value));
  }

  private sendValuesToParent(value) {
    this.selectedCategory.emit(value);
  }
}
