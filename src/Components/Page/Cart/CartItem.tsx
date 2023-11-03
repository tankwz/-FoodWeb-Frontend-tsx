import { cartItemModel } from '../../../Interfaces';
import React, { useEffect, useState } from 'react';
import {
  useSetCartQuantityMutation,
  useUpdateCartMutation,
} from '../../../api/shoppingCartApi';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '../../../Storage/Redux/shoppingCartSlice';
interface Props {
  cartItem: cartItemModel;
}

function CartItem(props: Props) {
  const [updating, setupdating] = useState<boolean>(!true);
  const [count, setCount] = useState(() => props.cartItem.quantity);
  const [updateCart, result] = useUpdateCartMutation();
  const [setcartQuantity, result2] = useSetCartQuantityMutation();
  const dispatch = useDispatch();

  const [showFullDescription, setShowFullDescription] = useState(!true);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const description = props.cartItem.menuItem.description;
  const truncatedDescription =
    description.length > 300
      ? description.substring(0, description.lastIndexOf(' ', 300)) + '...'
      : description;

  const handleUpdateCart = async (newcount: number) => {
    setupdating(true);
    const response = await updateCart({
      userId: 'ac131858-7e3c-47c6-8627-24bf078cb8b6',
      itemId: props.cartItem.menuItem.id,
      quantity: newcount,
    });
    dispatch(removeFromCart({ cartItem: props.cartItem })); //still got removed from store without this line but imma put it here just in case

    setupdating(!true);
  };

  useEffect(() => {
    const updateCartQuantity = async () => {
      if (count < 1) {
        setCount(1);
      }
      if (count > 100) {
        setCount(100);
      }
      const response = await setcartQuantity({
        cartItemId: props.cartItem.id,
        quantity: count,
      });
      //  handle the response here if needed
      dispatch(updateQuantity({ cartItem: props.cartItem, quantity: count }));
    };

    updateCartQuantity();
  }, [count]);
  // useEffect(() => {
  //   if (count == 0) {
  //     const cartItem = props.cartItems;
  //     dispatch(removeFromCart({ cartItem, quantity: 0 }));
  //   }
  //   handleUpdateCart(count);
  // }, [count]);

  const setQuantity = (quantity: number) => {
    let newcount = count + quantity;
    if (newcount < 1) {
      setCount(1);
    } else if (newcount > 100) {
      setCount(100);
    } else {
      setCount(newcount);
    }
  };

  return (
    <div>
      <div
        className="row py-2 clickable"
        id="div-@Model.ListCarts[z].Id"
        style={{ border: '3px solid grey' }}
      >
        <div className=" py-2  col-12 col-lg-4  ps-1">
          <img
            className="  border border-1 border-secondary rounded"
            //   src={props.cartItem.menuItem.image}
            style={{ width: '100%' }}
          ></img>
        </div>
        <div className="col-12 col-lg-8 ">
          <div className="row">
            <div className="col-12 ps-1">
              <h3 className="text-info text-uppercase ">
                {props.cartItem.menuItem.name}
              </h3>
              <p>
                {showFullDescription ? description : truncatedDescription}
                {description.length > 300 && (
                  <button
                    className="btn btn-sm link mb-1 ps-1  text-info"
                    onClick={toggleDescription}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </p>
            </div>
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-2 ms-2 p-0 ">
                  <div className="input-group">
                    <button
                      className="btn px-3 btn-secondary"
                      onClick={() => setQuantity(-1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control px-0 text-center"
                      value={count}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        if (!isNaN(newValue) && newValue >= 1) {
                          setCount(newValue);
                        } else {
                          // If the input is empty or not a valid number, set it to 1
                          setCount(1);
                        }
                      }}
                    ></input>

                    <button
                      className="btn px-3 btn-secondary"
                      onClick={() => setQuantity(+1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-3">
                  <div className="row">
                    <div className="col-12">
                      <span className="h5">
                        Price: ${props.cartItem.menuItem.price}
                      </span>
                    </div>
                    <div className="col-12">
                      <span className="h5">
                        Total: $
                        {(props.cartItem.menuItem.price * count).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-3 ms-2 p-0">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary form-control"
                  >
                    Buy
                  </button>
                </div>
                <div className="col-3 ms-2 p-0">
                  <button
                    className="btn btn-lg btn-danger form-control"
                    onClick={() => handleUpdateCart(0)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CartItem;
