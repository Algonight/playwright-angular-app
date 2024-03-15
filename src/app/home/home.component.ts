import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { AddTodoComponent } from '../todo/add-todo/add-todo.component';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    AddTodoComponent,
    TodoListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isAuthenticated?: boolean;
  homeSubscriptions = new Subscription();

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
