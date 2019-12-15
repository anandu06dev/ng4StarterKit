import { platformBrowser} from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../../../aot/src/app/main/app.module.ngfactory';
import '../../styles/global.css';

if (process.env.ENVIRONMENT === 'production') {
    enableProdMode();
    // Global CSS Styles as [vendor].css
}

const platform = platformBrowser();
platform.bootstrapModuleFactory(AppModuleNgFactory);
