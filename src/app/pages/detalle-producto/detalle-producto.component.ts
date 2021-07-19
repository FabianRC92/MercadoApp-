import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AttributesModel } from 'src/app/models/attributes.model';
import { ProductDetailModel } from 'src/app/models/product.detail';
import { ProductDetailDescriptionModel } from 'src/app/models/product.detail.description';
import { ProductService } from 'src/app/services/product.service';
import { setBread, unsetBread } from 'src/app/store/actions';
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
  public img: string = ''
  public condicionProducto: string = '';
  public detalleProducto!: ProductDetailModel;
  public descripcionProducto!: ProductDetailDescriptionModel;

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
    this.descriptionProduct();
    this.breadCopy = this.bread;

  }


  /**
   * @description llama servicio detalle prodico
   */
  detailProduct() {

    this.productService.detailProduct(this.idProducto, '').subscribe(
      data => {
        this.detalleProducto = data;
        this.img = this.detalleProducto.pictures[0].url;
        const bread: string = this.bread + this.detalleProducto.title;
        this.store.dispatch(setBread({ bread }))
        this.getCondicionProducto(this.detalleProducto.attributes);
      }
    )
  }


  /**
   * @description llama servicio descripción produco
   */
  descriptionProduct() {
    this.productService.detailProduct(this.idProducto, 'description').subscribe(
      data => {
        this.descripcionProducto = data;
      }
    )

  }


  /**
   * @description obtiene el valor de la condición del producto
   * @param attributes array de tipo attributes
   */
  getCondicionProducto(attributes: AttributesModel[]) {

    const itemCondition = attributes.filter(d => d.id === 'ITEM_CONDITION')[0];
    this.condicionProducto = itemCondition.value_name;

  }

}
