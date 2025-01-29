import { Directive, effect, HostBinding, HostListener, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Directive({
  selector: '[appKeyboardKey]',
  standalone: true,
})
export class KeyboardKeyDirective implements OnInit {
  keyboardSvc = inject(KeyboardService);
  private _values: string[] = [];
  private isShifted = signal(false);
  private isAlt = signal(false);

  @Input('appKeyboardKey') values: string = '';

  @HostBinding('innerText') currentValue: string = '';

  constructor() {
    effect(() => {
      this.isShifted.set(this.keyboardSvc.shift());
      this.updateCurrentValue();
    }, { allowSignalWrites: true });

    effect(() => {
      this.isAlt.set(this.keyboardSvc.alt());
      this.updateCurrentValue();
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    if (!this.values) return;

    this._values = this.values.split(' ');
    this.currentValue = this._values[0] || '';
  }

  updateCurrentValue() {
    const shift = this.isShifted();
    const alt = this.isAlt();
    if (!alt) {
      this.currentValue = shift ? this._values[0].toUpperCase() : this._values[0];
    } else {
      this.currentValue = shift ? this._values[2] : this._values[1];
    }
  }

  @HostListener('click')
  onClick() {
    this.keyboardSvc.fireKeyPressed(this.currentValue);
  }
}
