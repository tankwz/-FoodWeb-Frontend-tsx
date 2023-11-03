import React, { useState, useEffect } from 'react';
import { cartItemModel } from '../../../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { setSelectedItem } from '../../../Storage/Redux/shoppingCartSlice';

function CartFooter() {
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const [total, setTotal] = useState(0);
  const cal = () => {
    const total1 = cartFromStore.reduce((accumulator, cartItem) => {
      if (cartItem.selected) {
        // Multiply the menuItem.price by quantity and add to the accumulator
        return accumulator + cartItem.menuItem.price * cartItem.quantity;
      } else {
        return accumulator;
      }
    }, 0);
    //const totalRounded = Number(total.toFixed(2));
    setTotal(Number(total1.toFixed(2)));
    console.log(total);
  };
  useEffect(() => {
    cal();
  });

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
            <div className="col-3 d-flex align-items-center pt-3 offset-6">
              <h5 style={{ display: 'inline' }} id="TotalOrderPrice">
                For Total: $<span className="">{total}</span>
              </h5>
            </div>
            <div className="col-3 ">
              <button
                type="submit"
                className={`btn btn-primary mt-2 form-control py-2 ${
                  total > 0 ? '' : 'disabled '
                }`}
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
