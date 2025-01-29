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

  currentLangIndex: Signal<number> = computed((): number => {
    return this.languageList.findIndex(lang => lang.code === this.currentLang());
  });
  nextLangIndex: Signal<number> = computed((): number => {
    return (this.currentLangIndex() + 1) % this.languageList.length;
  });

  activeElement = signal<HTMLElement | null>(null);

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
    this.currentLang.set(this.languageList[this.nextLangIndex()].code);
    this.alt.set(false);
    this.shift.set(false);
  }

  getNextLanguageLabel() {
    return this.languageList[this.nextLangIndex()].label || '?';
  }

  setActiveElement(element: HTMLElement | null) {
    this.activeElement.set(element);
  }
}
