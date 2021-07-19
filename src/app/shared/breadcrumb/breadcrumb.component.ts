import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {


  private breadSubscription: Subscription = new Subscription();
  public listCategory: CategoryModel[] = [];
  public breadcrump: string = '';
  public mayor: any[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.breadSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.breadSubscription = this.store.select('bread').subscribe(({ bread }) => {
      this.breadcrump = bread;
    });

  }

}
