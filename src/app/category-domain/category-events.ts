import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Category } from './category/Category';


export const businessCategoryListChanged = eventGroup({
    source: 'Business Category List Changed',
    events: {
        listChanged: type<Category[]>(),

    },
});