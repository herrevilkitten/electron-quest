import {
  BehaviorSubject,
  Subject,
  Subscription,
  filter,
  takeUntil,
} from 'rxjs';

export enum RunStates {
  STOPPED,
  STARTING,
  STARTED,
  STOPPING,
}

export class RunState extends BehaviorSubject<RunStates> {
  start() {
    this.next(RunStates.STARTED);
  }

  stop() {
    this.next(RunStates.STOPPED);
  }

  whileRunning() {
    const shutdown = new Subject<void>();
    const runSub = this.pipe(
      filter((value) => value === RunStates.STOPPED)
    ).subscribe(() => {
      shutdown.next();
      shutdown.complete();
      runSub?.unsubscribe();
    });
    return takeUntil(shutdown);
  }
}

export const RUN_STATE = new RunState(RunStates.STARTED);
