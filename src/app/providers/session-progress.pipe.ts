import { Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone } from '@angular/core';
import { Session } from './conference.model';

@Pipe({name: 'sessionProgress', pure: false})
export class SessionProgressPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;
  private lastProgress: string;
  private lastValue: Session;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Session): string {
    if (this.hasChanged(value)) {
      this.lastProgress = this.getProgress(value);
      this.lastValue = value;
      this.removeTimer();
      this.createTimer();

    } else {
      this.createTimer();
    }

    return this.lastProgress;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }

    this.currentTimer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.lastProgress = this.getProgress(this.lastValue);

          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, 1000 * 5);
      }
    });
  }

  private removeTimer() {
    if (this.currentTimer) {
      window.clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private hasChanged(value: Session) {
    return this.getProgress(value) !== this.lastProgress;
  }

  private getProgress(session: Session) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const [sessionEndHours, sessionEndMinutes] = session.timeEnd.split(':');
    const [sessionStartHours, sessionStartMinutes] = session.timeStart.split(':');

    const sessionStartEndDiff = Date.parse(`01/01/2018 ${sessionEndHours}:${sessionEndMinutes}`) -
      Date.parse(`01/01/2018 ${sessionStartHours}:${sessionStartMinutes}`);
    const sessionDurationMinutes = Math.floor((sessionStartEndDiff / 1000) / 60);

    const sessionStartNowDiff = Date.parse(`01/01/2018 ${hours}:${minutes}`) -
      Date.parse(`01/01/2018 ${sessionStartHours}:${sessionStartMinutes}`);
    const sessionStartedMinutesAgo = Math.floor((sessionStartNowDiff / 1000) / 60);

    const progress = 100 * sessionStartedMinutesAgo / sessionDurationMinutes;
    return progress > 100 ? '100' : progress < 0 ? '0' : progress.toFixed();
  }
}
