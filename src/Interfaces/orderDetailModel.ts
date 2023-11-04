import menuItemModel from './menuItemModel';

export default interface orderHeaderModel {
  orderDetailId?: number;
  orderHeadId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  itemName?: string;
  quantity?: number;
  price?: number;
}
