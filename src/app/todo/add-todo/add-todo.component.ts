import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoService } from '../../shared/services/to-do.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent implements OnInit {
  toDoForm: FormGroup = new FormGroup({});

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.toDoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onAddToDo() {
    console.log(this.toDoForm.value);
    this.toDoService.addNewToDoItem(this.toDoForm.value);
  }

  resetForm() {
    this.toDoForm.reset();
  }
}
