import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //Injection du httpClient
    provideHttpClient(
      withXsrfConfiguration({
        cookieName:'XSRF-TOKEN',headerName:'X-XSRF-TOKEN'
      })
    )


  ]
};
