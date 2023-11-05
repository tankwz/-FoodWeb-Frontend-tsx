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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryList, setCategoryList] = useState(['']);

  const { data, isLoading, isSuccess, isError, error } =
    useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempArray: menuItemModel[] = searchFilter(
        selectedCategory,
        searchValue
      );

      setMenuItems(tempArray);
    }
  }, [searchValue]);

  const searchFilter = (category: string, search: string) => {
    let tempArray =
      category === 'All'
        ? [...data.result]
        : data.result.filter(
            (item: menuItemModel) =>
              item.category.toLocaleUpperCase() === category.toLocaleUpperCase()
          );

    //let tempMenuItems = [...data.result];

    if (search) {
      const temp = [...tempArray];
      tempArray = temp.filter((item: menuItemModel) =>
        removeVietnameseDiacritics(item.name)
          .toUpperCase()
          .includes(removeVietnameseDiacritics(search).toUpperCase())
      );
    }
    return tempArray;
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
      //categories
      const tempCategoryList = ['All'];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleCategory = (index: number) => {
    const buttons = document.querySelectorAll('.custom-buttons');
    let localCategory;
    buttons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) {
        button.classList.add('active');

        if (index === 0) {
          localCategory = 'All';
        } else {
          localCategory = categoryList[buttonIndex];
        }
        setSelectedCategory(localCategory);
        const tempArray = searchFilter(localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove('active');
      }
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <LoaderBig></LoaderBig>
        </div>
      ) : !isSuccess ? (
        <div>Error while fetching data...Check console for error details</div>
      ) : (
        <div className="row ">
          <div className="my-3 ">
            <ul className="nav w-100 d-flex justify-content-center ">
              {categoryList.map((categoryName, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`nav-link p-0 pb-2 custom-buttons fs-5  ${
                      index === 0 && 'active'
                    } `}
                    onClick={() => handleCategory(index)}
                  >
                    <span className="text-white"> {categoryName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
