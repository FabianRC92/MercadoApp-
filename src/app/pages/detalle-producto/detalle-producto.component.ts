import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ItemsModel } from 'src/app/models/items.model';
import { ProductService } from 'src/app/services/product.service';
import { setBread } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit, OnDestroy {

  private idProducto: string = '';
  private breadSubscription: Subscription = new Subscription();
  private bread: string = '';
  private breadCopy: string = '';  
  public detalleProducto!: ItemsModel;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>) { }


  ngOnDestroy(): void {
    const bread = this.breadCopy;
    this.store.dispatch(setBread({ bread }))
    this.breadSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.route.params.subscribe(p => this.idProducto = p['id']);
    this.breadSubscription = this.store.select('bread').subscribe(({ bread }) => {
      this.bread = bread;
    });

    this.detailProduct();  
    this.breadCopy = this.bread;

  }


  /**
   * @description llama servicio detalle prodico
   */
  detailProduct() {

    this.productService.detailProduct(this.idProducto).subscribe(
      data => {
        this.detalleProducto = data;
        const bread: string = this.bread + this.detalleProducto.title;
        this.store.dispatch(setBread({ bread }))

      }
    )
  }

}
