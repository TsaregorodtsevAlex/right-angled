import { Component, Input, EventEmitter, Self } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';

import { RtListService, RtBufferedPager, BUFFERED_LIST_PROVIDERS } from '../providers/index';

@Component({
    exportAs: 'rtList',
    providers: [BUFFERED_LIST_PROVIDERS],
    selector: 'rt-buffered-list',
    template: `<ng-content></ng-content>`
})
export class BufferedListComponent extends ListBase {
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtListService, @Self() pager: RtBufferedPager) {
        super(listService, pager);
    }
}