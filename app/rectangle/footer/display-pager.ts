import {Component, KeyValueDiffers, ChangeDetectorRef} from 'angular2/core';
import {RtList} from '../lists/list';
import {NgBufferedListService} from '../bootstrap/ngBufferedListService';
import {ProgressState} from 'e2e4/src/common/progressState';
import {RtStatusControlBase} from './status-control-base';

@Component({
    selector: 'rt-display-pager',
    template: `<div *ngIf="isVisible"><ng-content></ng-content></div>`
})
export class RtDisplayPager extends RtStatusControlBase {
    changeDetectorRef: ChangeDetectorRef;
    constructor(listHost: RtList, differs: KeyValueDiffers, changeDetectorRef: ChangeDetectorRef) {
        super(listHost, differs, ProgressState.Done);
        this.changeDetectorRef = changeDetectorRef;
    }
    checkStateChanges(item: any): void {
        if (item.key === 'state' || item.key === 'totalCount' || (this.listHost.isBufferedList && item.key === 'skip')) {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.changeDetectorRef.detectChanges();
        let isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.totalCount !== 0;
        if (this.listHost.isBufferedList) {
            isVisible = isVisible && (<NgBufferedListService>this.listHost.serviceInstance).skip < this.listHost.serviceInstance.totalCount;
        }
        this.isVisible = isVisible;
    }
}
