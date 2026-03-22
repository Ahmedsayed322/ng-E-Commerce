import { Directive } from '@angular/core';

@Directive({
  selector: '[appPanel]',
  host: {
    class: 'p-6 bg-white shadow-sm rounded-lg border border-gray-200',
  },
})
export class Panel {
  constructor() {}
}
