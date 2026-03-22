import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const desc = value.length < limit ? value : value.slice(0, limit) + '....';
    return desc;
  }
}
