import { ChangeDetectionStrategy, Component, effect, ElementRef, HostBinding, HostListener, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService } from '../keyboard.service';
import { KeyboardKeyDirective } from '../keyboard-key.directive';
import { SvgIconDirective } from '../../directives/svg-icon.directive';

@Component({
  selector: 'app-keyboard-num',
  standalone: true,
  imports: [
    KeyboardKeyDirective,
    SvgIconDirective,
  ],
  templateUrl: './keyboard-num.component.html',
  styleUrl: './keyboard-num.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNumComponent {
  keyboardSvc = inject(KeyboardService);

  alt = this.keyboardSvc.alt;
  shift = this.keyboardSvc.shift;

  @HostBinding('class.shown') private shown = false;

  constructor() {
    effect(() => {
      this.shown = this.keyboardSvc.keyboardRequested();
    });
  }

  onShift() {
    this.shift.set(!this.shift());
  }

  onAlt() {
    this.alt.set(!this.alt());
    this.shift.set(false);
  }

  onBackspace() {
    this.keyboardSvc.fireBackspacePressed();
  }

  onEnter() {
    this.keyboardSvc.fireEnterPressed();
  }

  onLang() {
    this.keyboardSvc.setLangKeyboard();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
