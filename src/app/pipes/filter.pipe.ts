import { Pipe, PipeTransform, Injectable } from '@angular/core'

@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchString: string): any[] {
        if (!items) {
            return []
        }
        if (!searchString) {
            return items.splice(0, 50)
        }

        searchString = searchString.toLowerCase()
        let i=0;

        items.filter( (item: object) => {
            let result = false
            Object.keys(item).forEach(key => {
                const value = item[key] ? item[key] : ''
                if ( value.toString().toLowerCase().includes(searchString) ) {
                    i++;
                    result = true
                }
            })

            return result
        });

        return items.splice(0, 50);
    }
}