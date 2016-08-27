import { Component, EventEmitter, Input, Self } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { BUFFERED_LIST_PROVIDERS } from '../../providers';
import { RtListService } from '..//list-service';
import { ListBase } from './list-base';

@Component({
    exportAs: 'rtList',
    moduleId: module.id,
    providers: [BUFFERED_LIST_PROVIDERS],
    selector: 'rt-buffered-list',
    template: `<ng-content></ng-content>`
})
export class BufferedListComponent extends ListBase {
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtListService, @Self() pager: BufferedPager) {
        super(listService, pager);
    }
}
