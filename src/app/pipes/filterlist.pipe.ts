import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterlist'
})
export class FilterlistPipe implements PipeTransform {

  transform(value: any, args: String): any {
    return value.filter(
      item => args && item.username.toLowerCase().indexOf(args.toLowerCase()) > -1
    );
  }
}