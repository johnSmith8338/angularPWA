import { Directive, effect, HostBinding, HostListener, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Directive({
  selector: '[appKeyboardKey]',
  standalone: true,
})
export class KeyboardKeyDirective implements OnInit, OnDestroy {
  private _values: string[] = [];
  private isShifted = signal(false);
  private isAlt = signal(false);

  @Input('appKeyboardKey') values: string = '';

  @HostBinding('innerText') currentValue: string = '';

  constructor(private keyboard: KeyboardService) {
    // console.log('values', this.values);

    // if (!this.values) return;

    // this._values = this.values.split(' ');
    // this.currentValue = this._values[0] || '';

    effect(() => {
      this.isShifted.set(this.keyboard.shift());
      this.updateCurrentValue();
    }, { allowSignalWrites: true });
    effect(() => {
      this.isAlt.set(this.keyboard.alt());
      this.updateCurrentValue();
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    // console.log('values', this.values);
    if (!this.values) return;

    this._values = this.values.split(' ');
    this.currentValue = this._values[0] || '';

    //   this.keyboard.shiftChanged.subscribe(shift => {
    //     this.isShifted = shift;
    //     this.updateCurrentValue();
    //   });
    //   this.keyboard.altChanged.subscribe(alt => {
    //     this.isAlt = alt;
    //     this.updateCurrentValue();
    //   });
  }

  ngOnDestroy() {
    // this.keyboard.shiftChanged.unsubscribe();
    // this.keyboard.altChanged.unsubscribe();
  }

  updateCurrentValue() {
    // if (!this.isAlt) {
    //   if (!this.isShifted) {
    //     this.currentValue = this._values[0];
    //   }
    //   else {
    //     this.currentValue = this._values[0].toUpperCase();
    //   }
    // }
    // else {
    //   if (!this.isShifted) {
    //     this.currentValue = this._values[1];
    //   }
    //   else {
    //     this.currentValue = this._values[2];
    //   }
    // }
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
    this.keyboard.fireKeyPressed(this.currentValue);
  }
}
