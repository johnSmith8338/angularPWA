import { computed, Injectable, Signal, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface LanguageList {
  code: 'en' | 'ru';
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  // private _shift: boolean = false;
  // private _alt: boolean = false;
  // private _keyboardRequested: Subject<boolean>;
  // private _shiftChanged: Subject<boolean>;
  // private _altChanged: Subject<boolean>;
  // private _keyPressed: Subject<string>;
  // private _backspacePressed: Subject<void>;
  // private _enterPressed: Subject<void>;
  languageList: LanguageList[] = [
    { code: 'en', label: 'Eng' },
    { code: 'ru', label: 'Рус' },
  ]

  shift = signal(false);
  alt = signal(false);
  keyboardRequested = signal(false);
  keyPressed = signal<string>('');
  backspacePressed = signal(false);
  enterPressed = signal(false);

  currentLang = signal<'en' | 'ru'>('en');
  isNum = signal(false);
  // langSwitched = false;
  currentLangIndex: Signal<number> = computed((): number => {
    return this.languageList.findIndex(lang => lang.code === this.currentLang());
  });
  nextLangIndex: Signal<number> = computed((): number => {
    return (this.currentLangIndex() + 1) % this.languageList.length;
  });

  activeElement = signal<HTMLElement | null>(null);

  constructor() {
    // this._keyboardRequested = new Subject<boolean>();
    // this._shiftChanged = new Subject<boolean>();
    // this._altChanged = new Subject<boolean>();
    // this._keyPressed = new Subject<string>();
    // this._backspacePressed = new Subject<void>();
    // this._enterPressed = new Subject<void>();
  }

  // get shift(): boolean {
  //   return this._shift;
  // }

  // set shift(value: boolean) {
  //   this._shiftChanged.next(this._shift = value);
  // }

  // get alt(): boolean {
  //   return this._alt;
  // }

  // set alt(value: boolean) {
  //   this._altChanged.next(this._alt = value);
  // }

  // get keyboardRequested() {
  //   return this._keyboardRequested;
  // }

  // get shiftChanged() {
  //   return this._shiftChanged;
  // }

  // get altChanged() {
  //   return this._altChanged;
  // }

  // get keyPressed() {
  //   return this._keyPressed;
  // }

  // get backspacePressed() {
  //   return this._backspacePressed;
  // }

  // get enterPressed() {
  //   return this._enterPressed;
  // }

  fireKeyboardRequested(show: boolean) {
    this.keyboardRequested.set(show);
  }

  fireKeyPressed(key: string) {
    this.keyPressed.set(key);
  }

  fireBackspacePressed() {
    this.backspacePressed.set(true);
  }

  fireEnterPressed() {
    this.enterPressed.set(true);
  }

  setLangKeyboard() {
    // if (!this.langSwitched) {
    this.currentLang.set(this.languageList[this.nextLangIndex()].code);
    this.isNum.set(false);
    //   this.langSwitched = true;
    // }
  }

  setNumKeyboard() {
    this.isNum.set(true);
  }

  getNextLanguageLabel() {
    // return this.languages.find(lang => lang.code === this.currentLang())?.label || '?';

    return this.languageList[this.nextLangIndex()].label || '?';
  }

  setActiveElement(element: HTMLElement | null) {
    this.activeElement.set(element);
  }

  //   resetLangSwitched() {
  //     this.langSwitched = false;
  //   }
}
