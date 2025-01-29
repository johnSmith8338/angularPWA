import { Directive, effect, ElementRef, HostListener, OnInit } from '@angular/core';
import { KeyboardService } from './keyboard.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appOskInput]',
  standalone: true,
})
export class OskInputDirective implements OnInit {
  private measure!: HTMLElement;

  constructor(private el: ElementRef, private keyboard: KeyboardService) {
    effect(() => {
      const key = this.keyboard.keyPressed;
      const activeElement = this.keyboard.activeElement();
      if (key && activeElement === this.el.nativeElement) {
        this.onKey(key());
        this.keyboard.keyPressed.set('');
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const backspacePressed = this.keyboard.backspacePressed();
      const activeElement = this.keyboard.activeElement();
      if (backspacePressed && activeElement === this.el.nativeElement) {
        this.onBackspace();
        this.keyboard.backspacePressed.set(false);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const enterPressed = this.keyboard.enterPressed();
      const activeElement = this.keyboard.activeElement();
      if (enterPressed && activeElement === this.el.nativeElement) {
        this.onEnter();
        this.keyboard.enterPressed.set(false);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.measure = document.createElement("span");
    this.measure.style.position = "absolute";
    this.measure.style.right = "100%";
    document.body.appendChild(this.measure);
  }

  @HostListener("focus")
  private onFocus() {
    const inputType = this.el.nativeElement.getAttribute("type");
    if (inputType === 'tel') {
      this.keyboard.isNum.set(true);
    }

    this.keyboard.setActiveElement(this.el.nativeElement);
    this.keyboard.fireKeyboardRequested(true);
  }

  @HostListener("blur")
  private onBlur() {
    this.keyboard.isNum.set(false);
    this.keyboard.setActiveElement(null);
    this.keyboard.fireKeyboardRequested(false);
  }

  private onKey(key: string) {
    const element = this.el.nativeElement as HTMLInputElement;
    const start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? 0;

    this.measure.textContent = element.value.substring(0, start) + key;
    element.value = element.value.substring(0, start) + key + element.value.substring(end);
    element.selectionStart = element.selectionEnd = start + 1;

    this.updateScrollPosition();
  }

  private onBackspace() {
    const element = this.el.nativeElement as HTMLInputElement;
    let start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? 0;

    if (start == 0) {
      return;
    }

    if (start == end) {
      start--;
    }

    this.measure.textContent = element.value.substring(0, start);
    element.value = element.value.substring(0, start) + element.value.substring(end);
    element.selectionStart = element.selectionEnd = start;

    this.updateScrollPosition();
  }

  private updateScrollPosition() {
    const element = this.el.nativeElement as HTMLInputElement;
    element.scrollLeft = this.measure.offsetWidth - (element.clientWidth - 10);
  }

  private onEnter() {
    alert("Enter");
  }
}
