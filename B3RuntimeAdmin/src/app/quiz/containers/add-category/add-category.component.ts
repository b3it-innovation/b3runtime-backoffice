import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'app/quiz/model/category.model';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ActionState } from '../../model/action-state.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  addCategoryActionState$: Observable<ActionState>;
  categories$: Observable<Category[]>;

  addCategoryForm: FormGroup;
  categoryNames: string[];
  filteredCategories: Observable<string[]>;

  constructor(private quizStoreService: QuizStoreService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.subscribeToStores();
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  onAddCategory(): void {
    if (this.allowAddingNewCategoryToStore()) {
      this.addCategoryToStore();
      this.clearCategoryNameFormValue();
    }
  }

  onSelectedCategory(event) {
    this.addCategoryForm.patchValue({ categoryName: event });
  }

  private subscribeToStores() {
    this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe).subscribe((data: Category[]) => {
      this.categoryNames = data.map((item) => item.name);
    });

    this.categories$ = this.quizStoreService.selectCategories();

    this.addCategoryActionState$ = this.quizStoreService.selectAddCategoryActionState().takeUntil(this.ngUnsubscribe);
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private clearCategoryNameFormValue() {
    this.addCategoryForm.controls.categoryName.patchValue('');
  }

  private addCategoryToStore(): void {
    this.quizStoreService.addCategory({ name: this.addCategoryForm.value.categoryName });
  }

  private allowAddingNewCategoryToStore(): boolean {
    return (this.isCategoryNameNew() && this.isFormValid())
  }

  private isFormValid(): boolean {
    return this.addCategoryForm.valid;
  }

  private isCategoryNameNew(): boolean {
    return !this.categoryNames.includes(this.addCategoryForm.value.categoryName);
  }

  private buildForm() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', [
        Validators.required,
      ]]
    });
  }

}
