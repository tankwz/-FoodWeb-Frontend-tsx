import React from 'react';
import { menuItemModel, orderHeaderModel } from '../../../Interfaces';

import { LoaderBig } from '../Utility';
import { useNavigate } from 'react-router-dom';
import { timeCalculation } from '../../../Util';
import { statusColor } from '../../../Helper';

interface Props {
  menuItems: menuItemModel[];
}

function MenuListTable({ menuItems }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container mt-5 ">
        <div className="row  m-0 p-0 align-items-center  justify-content-between ">
          <div className="col-5">
            <h1 className="">Items List</h1>
          </div>
          <div className="col-5 text-end ">
            <button className="btn btn-info py-2 px-3 fw-bold me-4">
              Add New Item
            </button>
          </div>
        </div>
        <div className="p-2">
          <div className=" align-middle ">
            <table
              id="tblData"
              className="table table-dark table-bordered table-striped table-hover align-middle "
              style={{ width: '100%' }}
            >
              <thead className="align-middle text-center  border  border-1 border-light   ">
                <tr className=" ">
                  <th className="">ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>price</th>
                  <th>Special Tag</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((menuItems: menuItemModel) => {
                  return (
                    <tr key={menuItems.id}>
                      <td>{menuItems.id}</td>
                      <td>{menuItems.name}</td>
                      <td>{menuItems.category}</td>
                      <td>$ {menuItems.price!.toFixed(2)}</td>
                      <td>{menuItems.specialTag}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-info ms-0 me-1"
                          onClick={() =>
                            navigate(
                              '/MenuItemsAdmin/MenuItemUpser/' + menuItems.id
                            )
                          }
                        >
                          <i className="bi bi-pencil-fill"></i> Edit
                        </button>
                        <button
                          className="btn btn-danger ms-1 me-0"
                          onClick={() =>
                            navigate(
                              '/MenuItemsAdmin/MenuItemUpser/' + menuItems.id
                            )
                          }
                        >
                          <i className="bi bi-trash-fill"></i> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="row border">
            <div className="col-1">ID</div>
            <div className="col-3">Name</div>
            <div className="col-2">Phone</div>
            <div className="col-1">Total</div>
            <div className="col-1">Items</div>
            <div className="col-2">Date</div>
            <div className="col-2"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MenuListTable;
