import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hw-component',
    encapsulation:ViewEncapsulation.None,
    styleUrls : ['./feature.component.css'],
    templateUrl: './feature.component.html'
})
export class FeatureComponent {
    @Input() describtion : string;
}

