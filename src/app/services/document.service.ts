import { Injectable, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

type Direction = 'ltr' | 'rtl';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  constructor(@Inject(DOCUMENT) private document) {}

  public setDirection(dir: Direction) {
    this.document.dir = dir;
  }
}