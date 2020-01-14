import { Component, OnInit } from "@angular/core";


//TODO var ska jag lägga denna Component?
@Component({
  selector: 'question-list',
  templateUrl: './drag-drop-question.component.html',
  styleUrls: ['./drag-drop-question.component.scss'],

})
export class DragDropQuestion implements OnInit {
  ngOnInit(): void {
    console.log(' i drag drop q')
  }



}

