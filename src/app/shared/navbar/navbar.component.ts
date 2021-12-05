import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { QueryModel } from 'src/app/models/query.model';
import { ProductService } from 'src/app/services/product.service';
import * as actions from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchForm = this.fb.group({
    producto: ['', Validators.required],
  });

  private routerSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }


  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          this.searchForm.disable()
        } else {
          this.searchForm.enable();
        }
      }
    });

  }


  /**
   * @description llama servicio buscar producto
   */
  searchProduct() {

    if (this.searchForm.valid) {
      const { producto } = this.searchForm.value;

      this.productService.getProducts(producto).subscribe((data: QueryModel) => {
        if (data.items.length > 0) {

          this.emitirInformacion(data);
        }
      });
    }

  }


  /**
   * @description emite información del producto y categoría
   */
  emitirInformacion(objQuery: QueryModel) {


    const category = objQuery.categories;
    const producto = objQuery.items;

    this.store.dispatch(actions.setProductos({ producto }));
    this.getBreadCrumb(category);

  }


  /**
   * @description llena el breadcrumb
   */
  getBreadCrumb(listCategory: CategoryModel[]) {

    let bread: string = '';
    const category = listCategory.filter(c => c.id === 'category');

    if (category.length > 0) {

      category.filter(ct => {

        const mayor = ct.values.sort((a: any, b: any) => b.results - a.results)[0];

        if (!mayor.path_from_root) {
          bread = mayor.name + ' > ';
        } else {

          ct.values.forEach(v => {
            if (v.path_from_root) {
              v.path_from_root.forEach((pf: any) => bread += pf.name + ' > ');
            }
          });

        }

      });

      this.store.dispatch(actions.setBread({ bread }));

    }

  }

}
