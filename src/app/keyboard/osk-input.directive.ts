import { Directive, effect, ElementRef, HostListener, OnInit } from '@angular/core';
import { KeyboardService } from './keyboard.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appOskInput]',
  standalone: true,
})
export class OskInputDirective implements OnInit {
  // private keySubscription!: Subscription;
  // private backspaceSubscription!: Subscription;
  // private enterSubscription!: Subscription;
  private measure!: HTMLElement;

  constructor(private el: ElementRef, private keyboard: KeyboardService) {
    effect(() => {
      const key = this.keyboard.keyPressed();
      if (key) {
        this.onKey(key);
        this.keyboard.keyPressed.set('');
      }
    }, { allowSignalWrites: true });
    effect(() => {
      if (this.keyboard.backspacePressed()) {
        this.onBackspace();
        this.keyboard.backspacePressed.set(false);
      }
    }, { allowSignalWrites: true });
    effect(() => {
      if (this.keyboard.enterPressed()) {
        this.onEnter();
        this.keyboard.enterPressed.set(false);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    // TODO I'm sure there's an "Angular way" of doing this
    let thisStyle = window.getComputedStyle(this.el.nativeElement);
    this.measure = document.createElement("span");
    this.measure.style.position = "absolute";
    this.measure.style.right = "100%";
    this.measure.style.font = thisStyle.font;
    document.body.appendChild(this.measure);
  }

  @HostListener("focus")
  private onFocus() {
    const inputType = this.el.nativeElement.getAttribute("type");
    // console.log("inputType", inputType);
    if (inputType === 'tel') {
      this.keyboard.setNumKeyboard();
    } else {
      this.keyboard.setLangKeyboard();
    }

    this.keyboard.fireKeyboardRequested(true);
    // this.subscribeToKeyboardEvents();
  }

  @HostListener("blur")
  private onBlur() {
    this.keyboard.fireKeyboardRequested(false);
    // this.unsubscribeFromKeyboardEvents();
  }

  // private subscribeToKeyboardEvents() {
  //   this.keySubscription = this.keyboard.keyPressed.subscribe(key =>
  //     this.onKey(key)
  //   );
  //   this.backspaceSubscription = this.keyboard.backspacePressed.subscribe(_ =>
  //     this.onBackspace()
  //   );
  //   this.enterSubscription = this.keyboard.enterPressed.subscribe(_ =>
  //     this.onEnter()
  //   );
  // }

  // private unsubscribeFromKeyboardEvents() {
  //   this.keySubscription.unsubscribe();
  //   this.backspaceSubscription.unsubscribe();
  //   this.enterSubscription.unsubscribe();
  // }

  private onKey(key: string) {
    // TODO Refactor this into a single method with the code in onBackspace
    const element = this.el.nativeElement as HTMLInputElement;
    const start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? 0;

    this.measure.textContent = element.value.substring(0, start) + key;
    element.value = element.value.substring(0, start) + key + element.value.substring(end);
    element.focus();
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
    element.focus();
    element.selectionStart = element.selectionEnd = start;

    this.updateScrollPosition();
  }

  private updateScrollPosition() {
    // let element = this.el.nativeElement;
    const element = this.el.nativeElement as HTMLInputElement;
    element.scrollLeft = this.measure.offsetWidth - (element.clientWidth - 10);
  }

  private onEnter() {
    alert("Enter");
  }
}
