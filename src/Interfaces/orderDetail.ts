import menuItemModel from './menuItemModel';

export default interface orderDetail {
  orderDetailId?: number;
  orderHeadId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  itemName?: string;
  quantity?: number;
  price?: number;
}
