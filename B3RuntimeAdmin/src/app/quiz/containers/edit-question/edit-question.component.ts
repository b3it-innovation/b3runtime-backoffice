import { Component, OnInit, OnDestroy } from "@angular/core";
import { QuizStoreService } from "../../store/quiz-store.service";
import { Subject } from "rxjs/Subject";
import { Category } from "../../model/category.model";
import { Observable } from "rxjs/Observable";
import { Question } from "../../model/question.model";
import { RouterNGRXService } from "../../../core/store/router/app-router.service";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { EditQuestionRequest, SelectQuestionRequest } from "../../payload/question";
import { QuestionOption } from "../../model/option.model";
import { ActionState } from "../../model/action-state.model";


@Component({
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  categories: Category[];
  selectQuestionActionState$: Observable<ActionState>;
  selectedQuestion: Question;
  editQuestionForm: FormGroup;
  optionsArray: FormArray;
  selectedCategories: string[] = [];


  constructor(
    private quizStoreService: QuizStoreService,
    private routerService: RouterNGRXService,
    private fBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscribeToStores();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private subscribeToStores() {
    this.quizStoreService.selectCategories().takeUntil(this.ngUnsubscribe).subscribe((categoriesInStore) => {
      this.categories = categoriesInStore;
      console.log(this.categories);
    })

    this.quizStoreService.getSelectedQuestion().takeUntil(this.ngUnsubscribe).subscribe((qestion) => {
      this.selectedQuestion = qestion;
      })

      const request: SelectQuestionRequest = {
        question: null
      }
      request.question = this.selectedQuestion;
      this.selectedCategories = this.selectedQuestion.categories;
    this.quizStoreService.selectSelectQuestionActionState(request);
  }


  onSaveQuestion() {
    if (this.isFormValid()) {
      this.addQuestionToStore();
    }
  }

  onAddCategory(category: Category): void {
    console.log(category);
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
    return this.editQuestionForm.valid;
  }


  private addQuestionToStore() {
    const formValue = this.editQuestionForm.value;
    const request: EditQuestionRequest = {
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
    console.log(request.question);
    // send payload to ngrx action
    this.quizStoreService.editQuestion(request);
  }

  private getQuestionFormValue(): any {
    return this.editQuestionForm.value;
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
    console.log(this.selectedCategories);
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
    this.editQuestionForm.controls.correctAnswer.setValue('');
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
    return this.editQuestionForm.controls.answerOptions as FormArray;
  }


  // create the form
  private buildForm(): void {
    console.log(this.selectedQuestion.categories[0]);
    this.editQuestionForm = this.fBuilder.group({
      title: [this.selectedQuestion.title, [
        Validators.required,
      ]],
      questionText: [this.selectedQuestion.text, [
        Validators.required
      ]],
      answerOptions: this.buildAnswerOption(),
      correctAnswer: [this.selectedQuestion.correctAnswer, [
        Validators.required
      ]],
      categories: this.selectedQuestion.categories
    });
  }

  private buildAnswerOption() : FormArray{
   this.optionsArray =  this.fBuilder.array([]);
    for (let i = 0; i < this.selectedQuestion.options.length; i++) {
       this.optionsArray.push (this.fBuilder.group({
        optionValue: [{ value: this.getOptionValueForIndex(i), disabled: false }, [
          Validators.required
        ]],
        optionText: [this.selectedQuestion.options[i].option, [
          Validators.required
        ]]
      }));
    }
    return this.optionsArray;
  }

  private createNewAnswerOption() {
    return this.fBuilder.group({
      optionValue: [{ value: this.getNextAvailableOptionValue(), disabled: false }, [
        Validators.required
      ]],
      optionText: [, [
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