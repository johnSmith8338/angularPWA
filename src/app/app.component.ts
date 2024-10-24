import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularPWA';

  hide = false;
  show() {
    this.hide = !this.hide;
  }

  /** app update */
  swUpdate = inject(SwUpdate);
  constructor() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(takeUntilDestroyed())
        .subscribe((event) => {
          if (event.type === 'VERSION_READY') {
            this.startUpdating(); // start update with progress bar
            // this.activateUpdate(); // auto update
            // this.updateAvailable.set(true); // manual update
          }
        })
    }
  }
  /** auto update */
  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  /** manual update */
  updateAvailable = signal(false);
  reloadApp(): void {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  /** progress bar */
  progress = signal(0);
  estimatedTime = signal(30);
  startUpdating() {
    this.updateAvailable.set(true);

    let progress = 0;
    let estimatedTime = 30;

    const timer = interval(1000).subscribe(() => {
      progress += 100 / estimatedTime;
      estimatedTime--;

      this.progress.set(progress);
      this.estimatedTime.set(estimatedTime);

      if (progress >= 100) {
        timer.unsubscribe();
        this.completeUpdate();
      }
    });
  }

  completeUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }
}
