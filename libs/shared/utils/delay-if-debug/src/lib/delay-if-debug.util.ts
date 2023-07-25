import { DEBUG } from '@ng-star-wars/shared/utils/base-url-token';
import {
  iif,
  of,
  switchMap,
  delay,
  MonoTypeOperatorFunction,
  pipe,
} from 'rxjs';

export const delayIfDebug = <T>(millis: number): MonoTypeOperatorFunction<T> =>
  pipe(switchMap((t) => iif(() => DEBUG, of(t).pipe(delay(millis)), of(t))));
