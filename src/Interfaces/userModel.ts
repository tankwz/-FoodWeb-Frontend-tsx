export default interface userModel {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
  exp: number; //for when the token expire
  pickupName?: string; //for when user change pickupName
}
