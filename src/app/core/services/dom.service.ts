import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken('WindowToken');

/* Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {

  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

/* Define class that implements the abstract class and returns the native window object. */
export class BrowserWindowRef extends WindowRef {

  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }
}

/* Define class that implements the abstract class and returns the native window object. */
export class ServerWindowRef extends WindowRef {

  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }
}

/* Create a factory function that returns the native window object. */
export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  serverWindowRef: ServerWindowRef,
  platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  if (isPlatformServer(platformId)) {
    return serverWindowRef.nativeWindow;
  }
  return new Object();
}

/* Create an injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
const browserWindowProvider: ClassProvider = {
  provide: BrowserWindowRef,
  useClass: BrowserWindowRef
};

const serverWindowProvider: ClassProvider = {
  provide: ServerWindowRef,
  useClass: ServerWindowRef
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ BrowserWindowRef, ServerWindowRef, PLATFORM_ID ]
};

/* Create an array of providers. */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  serverWindowProvider,
  windowProvider
];
