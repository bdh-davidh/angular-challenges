import { Component, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]"></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <app-list-item
            (deleteItem)="deleteEvent($event)"
            [name]="item.firstName ?? item.name"
            [id]="item.id" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }

      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }

      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [ListItemComponent],
})
export class CardComponent {
  readonly list = input<any>([]);
  readonly customClass = input('');
  readonly addEvent = output();
  readonly deleteItem = output<number>();

  deleteEvent(id: number) {
    this.deleteItem.emit(id);
  }

  addNewItem() {
    this.addEvent.emit();
  }
}
