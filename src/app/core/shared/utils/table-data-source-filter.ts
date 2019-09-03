import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class TableDataSourceFilter extends DataSource<any> {

    protected ngUnsubscribe: Subject<void> = new Subject<void>();

    _filterChange = new BehaviorSubject('');
    get filter(): string {
        return this._filterChange.value;
    }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor() {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return Observable
            .merge(this.defineOriginalDataSetObservable(), this._filterChange.takeUntil(this.ngUnsubscribe))
            .map(() => this.filteredDataSet());

    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.stopAllSubscriptions();
    }

    private stopAllSubscriptions() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    abstract defineOriginalDataSetObservable(): Observable<any[]>;

    abstract filteredDataSet(): any[];

}
