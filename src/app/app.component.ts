/**
 * To use virtual keyboard in Angular, you can use the ngx-touch-keyboard package
 * link: https://www.npmjs.com/package/ngx-touch-keyboard
 */

import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { NgxTouchKeyboardModule } from 'ngx-touch-keyboard'
import { KeyboardEnComponent } from './keyboard/keyboard-en/keyboard-en.component';
import { OskInputDirective } from './keyboard/osk-input.directive';
import { KeyboardNumComponent } from './keyboard/keyboard-num/keyboard-num.component';
import { KeyboardRuComponent } from './keyboard/keyboard-ru/keyboard-ru.component';
import { KeyboardService } from './keyboard/keyboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxTouchKeyboardModule,
    KeyboardEnComponent,
    KeyboardNumComponent,
    KeyboardRuComponent,
    OskInputDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularPWA';

  keyboard = inject(KeyboardService);
  isNum = this.keyboard.isNum;
  currentLang = this.keyboard.currentLang;

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

  /** language switch method */
  ruLang = signal(false);
  switchLang(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.ruLang.set(!this.ruLang());
  }
}
