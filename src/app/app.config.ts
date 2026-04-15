import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { todoReducer } from './exercises/todo-ngrx/todo.reducer';
import { TodoEffects } from './exercises/todo-ngrx/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    // Configuração do NgRx solicitada na Seção 3.2
    provideStore({ 
      todo: todoReducer 
    }),
    provideEffects([TodoEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    })
  ],
};
