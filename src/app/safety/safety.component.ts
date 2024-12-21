import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BulletPointList } from '../business-domain/categroryListMock';
@Component({
    selector: 'll-safety',
    imports: [MatCardModule],
    templateUrl: './safety.component.html',
    styleUrl: './safety.component.scss'
})
export class SafetyComponent  {
    
    list = input.required<BulletPointList>();

}
