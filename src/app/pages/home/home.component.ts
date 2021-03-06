import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ItemsModel } from 'src/app/models/items.model';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {


  private productoSubscription: Subscription = new Subscription();
  public listProducts: ItemsModel[] = [];

  constructor(private productService: ProductService,
    private router: Router,
    private store: Store<AppState>
  ) { }


  ngOnDestroy(): void {
    this.productoSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.productoSubscription = this.store.select('producto').subscribe(({ producto }) => {
      this.listProducts = producto;
    });

  }


  /**
   * @description navega descrpicón producto
   * @param idProducto id del producto
   */
  detalleProducto(idProducto: string) {
    this.router.navigate(['../items', idProducto]);
  }

}
