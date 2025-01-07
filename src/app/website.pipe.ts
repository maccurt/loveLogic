import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'website'
})
export class WebsitePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 0) {
      value = value.replace('www.', '');
      value = value.replace('http://', '');
      value = value.replace('https://', '');

      if (value.lastIndexOf('/') === value.length - 1) {
        value = value.slice(0, value.length - 1);
      }
    }
    return value;
  }

}
