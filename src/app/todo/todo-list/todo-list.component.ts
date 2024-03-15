import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ToDo } from '../../shared/model/to-do.model';
import { ToDoService } from '../../shared/services/to-do.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDoList: ToDo[] = [];
  toDoListSubscription: Subscription = new Subscription();
  displayedColumns = ['title', 'description', 'isCompleted'];

  @ViewChild(MatTable) table!: MatTable<ToDo>;

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.toDoListSubscription = this.toDoService.toDoList$.subscribe(
      (toDoList) => {
        console.log('toDoList', toDoList);
        this.toDoList = toDoList;
        if (this.table) {
          this.table.renderRows();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.toDoListSubscription.unsubscribe();
  }
}
