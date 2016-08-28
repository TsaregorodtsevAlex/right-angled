import { Component, ElementRef, Input, OnChanges, SimpleChange } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TabSectionComponent } from './tab-section.component';

// google code-prettify
declare const PR: {
    prettyPrint(opt_whenDone?: Function, opt_root?: HTMLElement | HTMLDocument): string;
};

@Component({
    moduleId: module.id,
    selector: 'rt-demo-code-tab',
    template: `
    <div [hidden]="!isActive">
        <pre class="prettyprint">{{src | async}}</pre>
    </div>
  `
})
export class CodeTabComponent implements OnChanges {
    public isActive: boolean;
    public baseUrl: string = 'https://raw.githubusercontent.com/fshchudlo/right-angled/master/';
    public src: Observable<any> = Observable.empty();
    public fileName: string = '';
    public fileExtension: string = '';
    @Input() public url: string;
    constructor(tabs: TabSectionComponent, private http: Http, private elementRef: ElementRef) {
        tabs.addTab(this);
    }
    public ngOnChanges(changes: { url?: SimpleChange }): void {
        if (changes.url && typeof PR !== 'undefined') {
            this.fileName = this.url.substring(this.url.lastIndexOf('/') + 1);
            this.fileExtension = this.fileName.substring(this.fileName.lastIndexOf('.') + 1).toLowerCase();
            this.src = this.http.get(this.baseUrl + this.url)
                .map(res => {
                    return res.text();
                }).do(res => { setTimeout(() => PR.prettyPrint(null, this.elementRef.nativeElement), 50); });
        }
    }
}