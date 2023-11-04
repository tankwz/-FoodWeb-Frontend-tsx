import { orderDetailModel } from '.';

export default interface orderHeaderModel {
  orderHeadId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupAddress?: string;
  appUserId?: string;
  appUser?: any;
  orderTotal?: number;
  orderDate?: string;
  status?: string;
  totalItems?: number;
  orderDetails?: orderDetailModel[];
}
