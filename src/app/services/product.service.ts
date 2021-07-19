import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LimiteConsulta } from '../const/const';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { QueryModel } from '../models/query.model';
import * as actions from '../store/actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private api: string = 'https://api.mercadolibre.com/';
  private limit: number = LimiteConsulta.LIMITE;
  @Output() listProducts: EventEmitter<ProductModel[]> = new EventEmitter();
  @Output() listCategory: EventEmitter<CategoryModel[]> = new EventEmitter();
  constructor(private http: HttpClient,
    private store: Store<AppState>) { }

  /**
   * @description invoca servicio para consultar productos
   * @param productName nombre del producto
   * @returns observable con array de productos
   */
  getProducts(productName: string): Observable<QueryModel> {
    this.store.dispatch(actions.unsetProductos());
    this.store.dispatch(actions.unsetBread());
    return this.http.get<QueryModel>(
      this.api + `sites/MLA/search?q=${productName}&limit=${this.limit}`
    );
  }


  /**
   * @description emite cambio array de productos
   * @param listProducts array de productos
   */
  emitListProducts(listProducts: ProductModel[],) {
    this.listProducts.emit(listProducts);
  }


  /**
   * @description emite cambio array de categorías
   * @param listCategory array de categorias
   */
  emitListCategory(listCategory: CategoryModel[]) {
    this.listCategory.emit(listCategory);
  }



  /**
   * @description llama servicio detalle producto
   * @param idProducto id del producto
   * @param description description
   * @returns observable array u objet JSON
   */
  detailProduct(idProducto: string, description: string): Observable<any> {
    return this.http.get<any>(
      this.api + `items/${idProducto}/${description}`
    );
  }

}
