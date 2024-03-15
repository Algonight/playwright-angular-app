import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../model/to-do.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _toDoList: ToDo[] = [
    {
      title: "find bejouille's dad",
      description: "he's been missing for 3 days",
      isCompleted: false,
    },
    {
      title: "find bejouille's mom",
      description: "she's been missing for 3 days",
      isCompleted: false,
    },
    {
      title: "find bejouille's brother",
      description: "he's been missing for 3 days",
      isCompleted: true,
    },
    {
      title: 'tell Antonin to shut up',
      description: "he's been talking for 3 days",
      isCompleted: false,
    },
  ];

  private toDoList: BehaviorSubject<ToDo[]> = new BehaviorSubject(
    this._toDoList
  );

  get toDoList$() {
    return this.toDoList.asObservable();
  }

  addNewToDoItem(newToDo: ToDo) {
    newToDo.isCompleted = false;
    this._toDoList.push(newToDo);
    this.toDoList.next(this._toDoList);
  }
}
