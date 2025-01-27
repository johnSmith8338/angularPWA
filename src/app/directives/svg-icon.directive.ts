import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[iconName]',
  standalone: true,
})
export class SvgIconDirective {
  element = inject(ElementRef);
  renderer = inject(Renderer2);
  http = inject(HttpClient);

  @Input('iconName') iconName!: string;
  private subscription!: Subscription;

  ngOnInit(): void {
    if (this.iconName) {
      const svgPath = `assets/svg/${this.iconName}.svg`;
      this.subscription = this.http.get(svgPath, { responseType: 'text' }).subscribe(
        (data) => this.insertSvgContent(data),
        (error) => console.error(`Error loading SVG ${this.iconName}:`, error)
      )
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private insertSvgContent(svgContent: string): void {
    this.renderer.setProperty(this.element.nativeElement, 'innerHTML', svgContent);
  }
}
