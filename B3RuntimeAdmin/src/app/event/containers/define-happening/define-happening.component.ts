import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { RouterNGRXService } from "../../../core/store/router/app-router.service";
import { Category } from "../../../quiz/model/category.model";
import { HappeningStoreService } from "../../store/happening-store.service";
import { Observable } from "rxjs/Observable";
import { ActionState } from "../../model/action-state.model";

@Component({
    templateUrl: './define-happening.component.html',
    styleUrls: ['./define-happening.component.scss']
})
export class DefineHappeningComponen implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    addHappeningActionState$: Observable<ActionState>;

    defineHappeningForm: FormGroup;
    selectedCategories: string[] = [];
  
    constructor(
      private fBuilder: FormBuilder,
      private happeningStoreService: HappeningStoreService,
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
      return this.defineHappeningForm.valid;
    }
  
    private subscribeToStores() {
      // this.happeningStoreService.
      // selectCategories().takeUntil(this.ngUnsubscribe).subscribe((categoriesInStore) => {
      //   this.categories = categoriesInStore;
      // })
      this.addHappeningActionState$ = this.happeningStoreService.selectAddHappeningActionState().takeUntil(this.ngUnsubscribe);
    }
  
    private stopAllSubscriptions() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  
    private addQuestionToStore() {
      const formValue = this.defineHappeningForm.value;
    //   const request: AddQuestionRequest = {
    //     question: {
    //       key: '',
    //       title: formValue.title,
    //       text: formValue.questionText,
    //       imgUrl: '',
    //       options: this.mapFormValuesToQuestionOption(formValue),
    //       correctAnswer: formValue.correctAnswer,
    //       categories: this.mapSelectedCategoryNamesToCategoryKeys()
    //     }
    //   }
      // send payload to ngrx action
     // this.happeningStoreService.addQuestion(request);
    }
  
    private getQuestionFormValue(): any {
      return this.defineHappeningForm.value;
    }
  
    private isNewCategory(category: Category): boolean {
      return (!category.key);
    }
  
    private addNewCategoryToStore(category: Category) {
      if (this.isNewCategory(category)) {
     //   this.happeningStoreService.addCategory(category);
      }
    }
  
    private mapSelectedCategoryNamesToCategoryKeys() {
      console.log(this.getCategoriesWithStoreValuesFromSelectedCategoriesName().map((category) => category.key))
      return this.getCategoriesWithStoreValuesFromSelectedCategoriesName().map((category) => category.key);
    }
  
    private getCategoriesWithStoreValuesFromSelectedCategoriesName() {
        return null; 
   //  return this.categories.filter((categoryFromStore) => this.selectedCategories.includes(categoryFromStore.name));
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
      this.defineHappeningForm.controls.correctAnswer.setValue('');
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
      return this.defineHappeningForm.controls.answerOptions as FormArray;
    }
  
    // create the form
    private buildForm(): void {
      this.defineHappeningForm = this.fBuilder.group({
        title: ['', [
          Validators.required,
        ]],
        date: [],
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
  
    private mapFormValuesToQuestionOption(formValue){
    //   const allOptions: QuestionOption[] = [];
    //   formValue.answerOptions.forEach(element => {
    //     const option: QuestionOption = {
    //       imgUrl: '',
    //       option: element.optionValue,
    //       text: element.optionText,
    //     }
    //     allOptions.push(option);
    //   });
  
    //  return allOptions;
    }
  
  }
