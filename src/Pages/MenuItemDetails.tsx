import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMenuItemByIdQuery } from '../api/menuItemApi';

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { isLoading, data, isError, error, isSuccess } =
    useGetMenuItemByIdQuery(menuItemId);
  const [count, setCount] = useState(() => 0);

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
    if (newcount < 0) {
    } else if (newcount > 100) {
      setCount(100);
    } else {
      setCount(newcount);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isSuccess ? (
        <div className="container">
          <div className="card">
            <div className="card-header text-center">
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
                      <div className="border border-secondary ps-2 pt-1 mb-0 rounded-1 lh-sm remove-p-margin">
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
                              onChange={(e) =>
                                setCount(parseInt(e.target.value))
                              }
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
                    <div className="col-4 ">
                      <button
                        type="submit"
                        className="btn  btn-outline-primary text-white form-control"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="col-4 ">
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
                      >
                        Buy
                      </button>
                    </div>
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
