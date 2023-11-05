import React, { useEffect, useState } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../api/menuItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { LoaderBig } from '../Utility';
import { RootState } from '../../../Storage/Redux/store';
var unorm = require('unorm');
function MenuItemList() {
  const [menuItem, setMenuItems] = useState<menuItemModel[]>([]);
  const { data, isLoading, isSuccess, isError, error } =
    useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempArray: menuItemModel[] = searchFilter(searchValue);
      setMenuItems(tempArray);
    }
  }, [searchValue]);

  const searchFilter = (search: string) => {
    let tempMenuItems = [...data.result];
    if (search) {
      const temp = [...tempMenuItems];
      tempMenuItems = temp.filter((item: menuItemModel) =>
        removeVietnameseDiacritics(item.name)
          .toUpperCase()
          .includes(removeVietnameseDiacritics(search).toUpperCase())
      );
    }
    return tempMenuItems;
  };
  // const removeVietnameseDiacritics = (str: string) => {
  //   return str
  //     .normalize('NFD')
  //     .replace(/[\u0300-\u036f]/g, '')
  //     .toLowerCase();
  // };

  // debt => this doesn't quite work with the second word, like bún đ <= this one wont come out unless its correct unicode
  const removeVietnameseDiacritics = (str: string) => {
    const normalizedString = unorm.nfd(str);
    const strippedString = normalizedString.replace(/[\u0300-\u036f]/g, '');
    return strippedString.toLowerCase();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <LoaderBig></LoaderBig>
        </div>
      ) : !isSuccess ? (
        <div>Error while fetching data...Check console for error details</div>
      ) : (
        <div className="row">
          {data.result.length > 0 &&
            menuItem.map((menuItem: menuItemModel, index: number) => {
              return <MenuItemCard key={index} menuItem={menuItem} />;
            })}
        </div>
      )}
    </div>
  );
}

export default MenuItemList;
