import { Component, Pipe } from '@angular/core';

@Pipe({
  name: 'NameIndex',
})
export class NameIndex {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}

@Component({
  imports: [NameIndex],
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | NameIndex: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
