import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ToDo } from '../shared/model/to-do.model';
import { ToDoService } from '../shared/services/to-do.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
})
export class ToDoComponent implements OnInit {
  toDoList: ToDo[] = [];

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.toDoService.toDoList.subscribe((toDoList) => {
      this.toDoList = toDoList;
    });
    this.initializeForm();
  }

  initializeForm() {
    this.toDoForm.addControl('title', new FormControl(''));
    this.toDoForm.addControl('description', new FormControl(''));
  }

  onAddToDo() {
    this.toDoService.addNewToDoItem(this.toDoForm.value);
  }
}
