import React, { useState, useEffect } from 'react';
import { cartItemModel, shoppingCartItemModel } from '../../../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import {
  setCartTotal,
  setSelectedItem,
} from '../../../Storage/Redux/shoppingCartSlice';
import { useNavigate } from 'react-router-dom';

function CartFooter() {
  // const cartFromStore: cartItemModel[] = useSelector(
  //   (state: RootState) => state.shoppingCartStore.cartItems ?? []
  // );

  const bigCart: shoppingCartItemModel = useSelector(
    (state: RootState) => state.shoppingCartStore ?? null
  );

  const [total, setTotal] = useState(0);

  const nagivate = useNavigate();
  // useEffect(() => {
  //   if (selectAllChecked) {
  //     // Select all items
  //     cartFromStore.forEach((item) => {
  //       dispatch(setSelectedItem({ id: item.id, selected: true }));
  //     });
  //   } else {
  //     // Deselect all items
  //     cartFromStore.forEach((item) => {
  //       dispatch(setSelectedItem({ id: item.id, selected: false }));
  //     });
  //   }
  // }, [selectAllChecked, cartFromStore, dispatch]);
  // const handleSelectAllChange = () => {
  //   setSelectAllChecked(!selectAllChecked);
  // };
  //debt => gotta make a select all functional somehow
  return (
    <div>
      <div className="row">
        <div className="col-12 bg-secondary py-2  mb-3  ">
          <div className="row bg-secondary border-1 ">
            {/* <div className="col-2 form-check d-flex align-items-center check">
              <input
                type="checkbox"
                className="form-check-input ms-5 me-3 p-2"
                id="SelectAll"
                //  checked={selectAllChecked}
                //     onChange={handleSelectAllChange}
              />
              {/* <label for="SelectAll" className="form-check-label h5 m-0 pt-1">
                Select All
              </label> }
            </div> */}
            <div className="col-3 d-flex align-items-center  ">
              <small className="text-info">*Press in to select item</small>
            </div>
            <div className="col-3 d-flex align-items-center pt-3 offset-3">
              <h5 style={{ display: 'inline' }} id="TotalOrderPrice">
                For Total: $
                <span className="">{bigCart.cartTotal?.toFixed(2)}</span>
              </h5>
            </div>
            <div className="col-3 ">
              <button
                className={`btn btn-primary mt-2 form-control py-2 ${
                  bigCart.cartTotal! > 0 ? '' : 'disabled '
                }`}
                onClick={() => nagivate('/Checkout')}
              >
                <h4 className={`m-0 p-0`}>Buy</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartFooter;
