import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppReducer,metaReducers } from './com.practice/store/state/app.state';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(AppReducer,{metaReducers}),  //connect store to reducer
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
