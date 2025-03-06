import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'ThreeNumSplitWithDash',
  standalone: true,
})
export class ThreeNumSplitWithDash implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return '';
    const result = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1-');
    return result;
  }

}
