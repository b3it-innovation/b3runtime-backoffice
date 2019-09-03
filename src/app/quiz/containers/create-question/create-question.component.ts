import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';
import { ActionState } from 'app/quiz/model/action-state.model';
import { Category } from 'app/quiz/model/category.model';
import { AddQuestionRequest } from 'app/quiz/payload/question';
import { QuizStoreService } from 'app/quiz/store/quiz-store.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { QuestionOption } from 'app/quiz/model/option.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  categories: Category[];
  addQuestionActionState$: Observable<ActionState>;

  createQuestionForm: FormGroup;
  selectedCategories: string[] = [];

  constructor(
    private fBuilder: FormBuilder,
    private quizStoreService: QuizStoreService,
    private routerService: RouterNGRXService) {
  }

  ngOnInit() {
    this.buildForm();
    this.subscribeToStores();
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  onCreateQuestion() {
    if (this.isFormValid()) {
      this.addQuestionToStore();
    }
  }

  onAddCategory(category: Category): void {
    this.addNewCategoryToStore(category);
    this.addSelectedCategoryToList(category);
  }

  onRemoveCategory(category: Category): void {
    this.removeSelectedCategoryFromList(category);
  }

  onGoBack() {
    this.routerService.routeBack();
  }

  onAddOption() {
    this.addNewOptionToForm();
  }

  onRemoveOption(index: number) {
    this.removeOptionFromFrom(index);
    this.clearCorrectAnswerFromForm();
    this.renumberOptionValuesForExistingFormOptions();
  }

  private isFormValid() {
    return this.createQuestionForm.valid;
  }

  private subscribeToStores() {
    this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe).subscribe((categoriesInStore) => {
      this.categories = categoriesInStore;
    })
    this.addQuestionActionState$ = this.quizStoreService.selectAddQuestionActionState().takeUntil(this.ngUnsubscribe);
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private addQuestionToStore() {
    const formValue = this.createQuestionForm.value;
    const request: AddQuestionRequest = {
      question: {
        key: '',
        title: formValue.title,
        text: formValue.questionText,
        imgUrl: '',
        options: this.mapFormValuesToQuestionOption(formValue),
        correctAnswer: formValue.correctAnswer,
        categories: this.mapSelectedCategoryNamesToCategoryKeys()
      }
    }
    // send payload to ngrx action
    this.quizStoreService.addQuestion(request);
  }

  private getQuestionFormValue(): any {
    return this.createQuestionForm.value;
  }

  private isNewCategory(category: Category): boolean {
    return (!category.key);
  }

  private addNewCategoryToStore(category: Category) {
    if (this.isNewCategory(category)) {
      this.quizStoreService.addCategory(category);
    }
  }

  private mapSelectedCategoryNamesToCategoryKeys() {
    return this.getCategoriesWithStoreValuesFromSelectedCategoriesName().map((category) => category.key);
  }

  private getCategoriesWithStoreValuesFromSelectedCategoriesName() {
    return this.categories.filter((categoryFromStore) => this.selectedCategories.includes(categoryFromStore.name));
  }

  private addSelectedCategoryToList(category: Category) {
    this.selectedCategories.push(category.name);
  }

  private removeSelectedCategoryFromList(category: Category) {
    this.selectedCategories = this.selectedCategories.filter(categoryItemInList => (categoryItemInList !== category.name));
  }

  private addNewOptionToForm() {
    this.answerOptions.push(this.createNewAnswerOption());
  }

  private removeOptionFromFrom(optionNumber: number) {
    this.answerOptions.removeAt(optionNumber);
  }

  private clearCorrectAnswerFromForm() {
    this.createQuestionForm.controls.correctAnswer.setValue('');
  }

  private renumberOptionValuesForExistingFormOptions() {
    for (let i = 0; i < this.answerOptions.length; i++) {
      (<FormGroup>this.answerOptions.at(i)).controls.optionValue.setValue(this.getOptionValueForIndex(i));
    }
  }

  private getOptionValueForIndex(index: number) {
    return String.fromCharCode(65 + index);
  }

  private getNextAvailableOptionValue(): string {
    return String.fromCharCode(65 + this.answerOptions.length);
  }

  // used by template to get the form
  get answerOptions(): FormArray {
    return this.createQuestionForm.controls.answerOptions as FormArray;
  }

  // create the form
  private buildForm(): void {
    this.createQuestionForm = this.fBuilder.group({
      title: ['', [
        Validators.required,
      ]],
      questionText: ['', [
        Validators.required
      ]],
      answerOptions: this.fBuilder.array([]),
      correctAnswer: ['', [
        Validators.required
      ]],
      categories: []
    });
  }

  private createNewAnswerOption() {
    return this.fBuilder.group({
      optionValue: [{ value: this.getNextAvailableOptionValue(), disabled: false }, [
        Validators.required
      ]],
      optionText: ['', [
        Validators.required
      ]]
    });
  }

  private mapFormValuesToQuestionOption(formValue): QuestionOption[] {
    const allOptions: QuestionOption[] = [];
    formValue.answerOptions.forEach(element => {
      const option: QuestionOption = {
        imgUrl: '',
        option: element.optionValue,
        text: element.optionText,
      }
      allOptions.push(option);
    });

    return allOptions;
  }

}

