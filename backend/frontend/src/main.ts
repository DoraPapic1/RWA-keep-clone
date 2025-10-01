
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication }               from '@angular/platform-browser';
import { provideRouter }                      from '@angular/router';
import { HttpClientModule }                   from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }   from './app/app.component';
import { routes }         from './app/app.routes';
import { environment }    from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ),

    provideRouter(routes),

  
  ]
})
.catch(err => console.error(err));
