import { AddressModel } from './address.model';
import { ShippingModel } from './shipping.model';

export interface ProductModel {

  id: string;
  title: string;
  price: string;
  thumbnail: string;
  address: AddressModel;
  shipping: ShippingModel;
 

}
