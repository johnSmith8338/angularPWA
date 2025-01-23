import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService } from '../keyboard.service';
import { KeyboardKeyDirective } from '../keyboard-key.directive';

@Component({
  selector: 'app-keyboard-en',
  standalone: true,
  imports: [
    KeyboardKeyDirective,
  ],
  templateUrl: './keyboard-en.component.html',
  styleUrl: './keyboard-en.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardEnComponent {
  @HostBinding('class.shown')
  private shown!: boolean;

  private keyboardSubscription!: Subscription;

  constructor(private el: ElementRef, public keyboard: KeyboardService) {
  }

  ngOnInit() {
    this.keyboardSubscription = this.keyboard.keyboardRequested.subscribe(show => {
      if (show) {
        this.shown = true;
      }
      else {
        this.shown = false;
      }
    });
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
  }

  onShift() {
    this.keyboard.shift = !this.keyboard.shift;
  }

  onAlt() {
    this.keyboard.alt = !this.keyboard.alt;
    this.keyboard.shift = false;
  }

  onBackspace() {
    this.keyboard.fireBackspacePressed();
  }

  onEnter() {
    this.keyboard.fireEnterPressed();
  }

  onLang() {
    this.keyboard.fireLangPressed();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
