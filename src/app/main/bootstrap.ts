import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
// import '../styles/global.css'

//If not using enableProdMode, ng-reflect etc. will be rendered for debugging concerns.
if (process.env.ENVIRONMENT === 'production') {
    enableProdMode();
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
