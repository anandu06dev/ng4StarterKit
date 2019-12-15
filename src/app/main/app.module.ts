import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FeatureComponent } from '../pages/user/home/domain.feature/feature.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, FeatureComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
