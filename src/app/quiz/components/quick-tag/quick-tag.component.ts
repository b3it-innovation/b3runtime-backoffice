import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quick-tag',
  templateUrl: './quick-tag.component.html',
  styleUrls: ['./quick-tag.component.scss']
})
export class QuickTagComponent implements OnInit {

  // input to the component
  @Input() tagList: string[];
  @Input() set selectedTags(tags: string[]) {
    this.tagsModel = tags.slice();
  }
  // handles the output
  @Output() addTag = new EventEmitter<string>();
  @Output() removeTag = new EventEmitter<string>();

  tagsModel: string[] = [];
  filteredTags: string[] = [];

  ngOnInit(): void {
    this.onFilterList('');
  }

  onFilterList(value: string): void {
    this.filteredTags = this.tagList.filter((item) => {
      if (value) {
        return (item.toLowerCase().indexOf(value.toLowerCase()) > -1);
      } else {
        return false;
      }
    }).filter((item) => !this.tagsModel.includes(item));

  }

  onAddTag(value: string) {
    this.addTag.emit(value);
  }

  onRemoveTag(value: string) {
    this.removeTag.emit(value);
  }
}
