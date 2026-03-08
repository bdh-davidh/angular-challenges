import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { HttpService } from '../../http.service';

interface Todo {
  id: string;
  title: string;
  body: string;
  userId: string;
}

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (error()) {
      <div class="error">{{ error() }}</div>
    }

    @if (!loading()) {
      @for (todo of todos(); track todo.id) {
        @if (todo) {
          <p>
            {{ todo.title }}
            <button (click)="update(todo)">Update</button>
            <button (click)="remove(todo)">Remove</button>
          </p>
        }
      }
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  http = inject(HttpService);
  todos = signal<Todo[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loading.set(true);
    this.http
      .fetchItems<Todo>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (data) => {
          this.todos.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load todos. Please try again.');
          this.loading.set(false);
          console.error(err);
        },
      });
  }

  remove(todoToRemove: Todo) {
    this.loading.set(true);
    this.http
      .removeItem('https://jsonplaceholder.typicode.com/todos/', todoToRemove)
      .subscribe(() => {
        this.todos.update((todos) =>
          todos.filter((todo) => todo.id !== todoToRemove.id),
        );
      });
    this.loading.set(false);
  }

  update(todo: Todo) {
    this.loading.set(true);
    const updatedTodo = { ...todo, title: randText() };
    this.http
      .updateItem('https://jsonplaceholder.typicode.com/todos/', updatedTodo)
      .subscribe((todoUpdated: Todo) => {
        this.todos.update((todos) =>
          todos.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        );
      });
    this.loading.set(false);
  }
}
