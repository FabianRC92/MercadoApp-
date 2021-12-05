import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LimiteConsulta } from '../const/const';
import { QueryModel } from '../models/query.model';
import * as actions from '../store/actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private api = environment.api;

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
      this.api + `/items?q=${productName}`
    );
  }


  detailProduct(idProducto: string): Observable<any> {
    return this.http.get<any>(
      this.api + `/item-detail/${idProducto}`
    );
  }

}
