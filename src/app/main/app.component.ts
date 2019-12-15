import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{hw}}</h1>
        <hw-component [describtion]="describtion"></hw-component>
    `
})
export class AppComponent {
    hw : string = "Hello World!";
    describtion : string = "This is an Angular 4 StarterKit project";
}


