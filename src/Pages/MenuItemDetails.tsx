import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMenuItemByIdQuery } from '../api/menuItemApi';
import {
  useSetCartQuantityMutation,
  useUpdateCartMutation,
} from '../api/shoppingCartApi';
import { LoaderBig, LoaderSmall } from '../Components/Page/Utility';
import { apiResponse, cartItemModel, userModel } from '../Interfaces';
import { toastPop } from '../Helper';
import { SD } from '../Util/SD';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import {
  setSelectedItem,
  updateQuantity,
  updateQuantityForWithId,
} from '../Storage/Redux/shoppingCartSlice';
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { isLoading, data, isError, error, isSuccess } =
    useGetMenuItemByIdQuery(menuItemId);
  const [count, setCount] = useState(() => 1);
  const [updateCart, result] = useUpdateCartMutation();
  const [updating, setupdating] = useState<boolean>(!true);
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userStore
  );
  const cartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const handleUpdateCart = async () => {
    if (!userData.id) {
      navigate('/login');
      toastPop('Please login to add item to cart', SD.TOAST_DEFAULT);
      return;
    }

    setupdating(true);

    // const specificMenuItemId = menuItemId.toString(); // Convert to a string if necessary
    //  console.log(cartFromStore );
    if (menuItemId) {
      const numericMenuItemId = parseInt(menuItemId, 10) || 0;
      const thisParticularItemInThisSpecificCustomerCart = cartFromStore.find(
        (item) => item.menuItemId === numericMenuItemId
      );
      if (
        thisParticularItemInThisSpecificCustomerCart?.quantity == undefined ||
        thisParticularItemInThisSpecificCustomerCart?.quantity + count <= 100
      ) {
        const response: apiResponse = await updateCart({
          userId: userData.id,
          itemId: menuItemId,
          quantity: count,
        });
        if (response.data && response.data.isSuccess) {
          toastPop(
            `Added ${count} ${data.result.name} to cart!`,
            SD.TOAST_SUCCESS
          );
          setupdating(!true);

          return response;
        } else {
          toastPop('There is an error on the server side', SD.TOAST_ERROR);
        }
      } else {
        toastPop(
          `You already have ${thisParticularItemInThisSpecificCustomerCart?.quantity!} of ${
            data.result.name
          } in cart!, you can't have more than 100 items in cart`,
          SD.TOAST_WARNING
        );
      }
      setupdating(!true);
    }
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(data);
  //   } else {
  //     console.log(error);
  //   }
  // }, [isLoading]);
  useEffect(() => {
    if (count > 100) {
      setCount(100);
    }
  });
  const setQuantity = (quantity: number) => {
    let newcount = count + quantity;
    if (newcount < 1) {
    } else if (newcount > 100) {
      setCount(100);
    } else {
      setCount(newcount);
    }
  };
  //
  const dispatch = useDispatch();

  const [setcartQuantity, result2] = useSetCartQuantityMutation();
  const moveToCheckout = async () => {
    // if (!userData.id) {
    //   navigate('/login');
    //   toastPop('Please login to buy', SD.TOAST_DEFAULT);
    // } else {
    //   const cartid = await handleUpdateCart();
    //   // console.log(cartid?.data?.result);

    //   const response = await setcartQuantity({
    //     cartItemId: cartid?.data?.result,
    //     quantity: count,
    //   });

    //   dispatch(
    //     updateQuantityForWithId({
    //       cartItem: cartid?.data?.result,
    //       quantity: count,
    //     })
    //   );

    // dispatch(setSelectedItem({ id: cartid?.data?.result, selected: true }));

    navigate('/ShoppingCart');
    // if (menuItemId) {
    //   const numericMenuItemId = parseInt(menuItemId, 10) || 0;
    //   const thisParticularItemInThisSpecificCustomerCart = cartFromStore.find(
    //     (item) => item.menuItemId === numericMenuItemId
    //   );
    // }
    //
    //    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <LoaderBig></LoaderBig>
        </div>
      ) : isSuccess ? (
        <div className="container">
          <div className="card border-1 mt-4 shadow">
            <div className="card-header bg-gradient ms-0 py-4 text-center">
              <h3 className="my-0">{data.result?.name}</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-lg-5  text-center">
                  <img
                    className="card-img-top img-fluid rounded"
                    src={data.result.image}
                  ></img>
                  {data.result.specialTag &&
                    data.result.specialTag.length > 0 && (
                      <i
                        className="bi bi-star-fill btn btn-success"
                        style={{
                          position: 'absolute',
                          top: '71px',
                          left: '16px',
                          padding: '0px 5px',
                          borderRadius: '3px',
                          pointerEvents: 'none', // Make it not clickable

                          //        outline: 'none !important',
                          //    cursor: 'pointer',
                        }}
                      >
                        &nbsp; {data.result.specialTag}
                      </i>
                    )}
                </div>

                <div className=" col-lg-7 card-text">
                  <div className="row mb-0 pb-0">
                    <div className="col-12 col-md-6 pb-2 ">
                      <div className="row py-2">
                        <div className="container col-3 ms-0 me-3">
                          <h3
                            className="badge bg-info "
                            style={{ display: 'inline', fontSize: '1.1em' }}
                          >
                            {data.result?.category}
                          </h3>
                        </div>

                        <div className="ps-2 col-6 p-0 m-0 text-nowrap">{}</div>
                      </div>
                      <div className="ps-2 mt-2">
                        Price: ${data.result.price}
                      </div>
                    </div>
                    <div className="container ">
                      <h4 className="text-info ">Description</h4>
                      <div className="border border-secondary ps-2 py-2 mb-0 rounded-1 lh-sm remove-p-margin">
                        {data.result.description}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 ">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-2 ps-2 ms-1 pt-2 ps-4 ">
                          Quantity:
                        </div>
                        <div className="col-md-3 mb-3">
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

                          {/* <div className="input-group">
                        <span className="input-group-text">Quantity</span>
                        <input
                          asp-for="count"
                          className="form-control text-end"
                          type="number"
                          //   value="1"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </div> */}
                        </div>
                        <div className="col-6 pt-2">
                          <span>Estimate Time : </span>
                          <i className="bi bi-clock bg-warning badge"> 15m</i>
                        </div>
                      </div>
                    </div>
                    {updating ? (
                      <div className="text-center col-8">
                        <LoaderSmall></LoaderSmall>
                      </div>
                    ) : (
                      <>
                        <div className="col-4 ">
                          <button
                            className="btn  btn-outline-primary text-white form-control"
                            onClick={() => handleUpdateCart()}
                          >
                            Add To Cart
                          </button>
                        </div>

                        <div className="col-4 ">
                          <button
                            className="btn btn-primary form-control"
                            onClick={() => {
                              moveToCheckout();
                            }}
                          >
                            Go To Cart
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Error while fetching data, check console for more details</div>
      )}
    </div>
  );
}

export default MenuItemDetails;
