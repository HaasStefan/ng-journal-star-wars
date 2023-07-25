import { InjectionToken } from '@angular/core';

export const DEBUG = true;

export const BaseUrlToken = new InjectionToken<string>('baseUrl', {
  providedIn: 'root',
  factory: () => DEBUG ? '/assets/swapi' : 'https://swapi.dev/api/',
});
