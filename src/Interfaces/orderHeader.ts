import orderDetail from './orderDetail';

export default interface orderHeader {
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
  orderDetails?: orderDetail[];
}
