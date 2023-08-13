import {Component, Input, OnInit} from '@angular/core';
import {TaskList} from 'src/models/taskList';

@Component({
  selector: 'app-specific-task-list',
  templateUrl: './specific-task-list.component.html',
  styleUrls: ['./specific-task-list.component.scss']
})
export class SpecificTaskListComponent implements OnInit {

  @Input() taskList!: TaskList;

  constructor() {
  }

  ngOnInit(): void {
  }

}
