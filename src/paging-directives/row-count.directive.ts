import { Directive, HostBinding, HostListener, KeyValueDiffers } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RtList } from '../core/list';
import { PageSizeControlBase } from './page-size-control-base';

@Directive({
    /* tslint:disable-next-line:directive-selector-name directive-selector-type directive-selector-prefix */
    selector: 'input[rtRowCount]'
})
export class RowCountDirective extends PageSizeControlBase {
    @HostBinding('value')
    public innerValue: number;
    public get pageSize(): number {
        return this.pager.takeRowCount;
    }
    public set pageSize(value: number) {
        this.pager.takeRowCount = value;
    }
    public get checkChangesPropertyName(): string {
        return 'takeRowCountInternal';
    }
    constructor(listService: RtList, bufferedPager: BufferedPager, differs: KeyValueDiffers) {
        super(listService, bufferedPager, differs);
        if (bufferedPager === null) {
            throw new Error('[rtRowCount] directive can be used only with buffered list provider.');
        }
    }
    @HostListener('keyup.enter')
    public onEnter(): void {
        super.onComplete();
    }

    @HostListener('input', ['$event.target.value'])
    public inputHandler(value: any): void {
        super.setPageSize(value);
    }

    @HostListener('blur')
    public blurHandler(): void {
        super.restoreInputValue();
    }
}
