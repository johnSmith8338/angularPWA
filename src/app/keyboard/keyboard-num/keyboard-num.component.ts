import { ChangeDetectionStrategy, Component, effect, ElementRef, HostBinding, HostListener } from '@angular/core';
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
  @HostBinding('class.shown')
  private shown = false;

  private keyboardSubscription!: Subscription;

  constructor(private el: ElementRef, public keyboard: KeyboardService) {
    effect(() => {
      this.shown = this.keyboard.keyboardRequested();
    });
  }

  ngOnInit() {
    // this.keyboardSubscription = this.keyboard.keyboardRequested.subscribe(show => {
    //   if (show) {
    //     this.shown = true;
    //   }
    //   else {
    //     this.shown = false;
    //   }
    // });
  }

  ngOnDestroy() {
    // this.keyboardSubscription.unsubscribe();
  }

  onShift() {
    this.keyboard.shift.set(!this.keyboard.shift());
  }

  onAlt() {
    this.keyboard.alt.set(!this.keyboard.alt());
    this.keyboard.shift.set(false);
  }

  onBackspace() {
    this.keyboard.fireBackspacePressed();
  }

  onEnter() {
    this.keyboard.fireEnterPressed();
  }

  onLang() {
    this.keyboard.setLangKeyboard();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
