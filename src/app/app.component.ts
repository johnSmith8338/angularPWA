import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

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

  /** auto update of app */
  swUpdate = inject(SwUpdate);
  constructor() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          // this.activateUpdate();
          this.updateAvailable = true;
        }
      })
    }
  }
  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  updateAvailable = false;
  reloadApp(): void {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
