import cartItemModel from './cartItemModel';

export default interface shoppingCartItemModel {
  id?: number;
  userId?: string;
  cartItems?: cartItemModel[];
  cartTotal?: number;
}
