import React, { useEffect, useState } from 'react';
import { inputHelper, toastPop } from '../../Helper';
import { SD, SD_Categories } from '../../Util/SD';
import { LoaderBig } from '../../Components/Page/Utility';
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from '../../api/menuItemApi';
import { apiResponse } from '../../Interfaces';
import { useNavigate, useParams } from 'react-router-dom';

const Categories = [
  SD_Categories.Bread_Sandwich,
  SD_Categories.Pancakes,
  SD_Categories.Noodle,
  SD_Categories.Spring_Rolls,
  SD_Categories.Rice_Dish,
];
const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: Categories[0],
  price: '',
};

function MenuItemUpser() {
  //
  const { id } = useParams();
  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setUserInput(tempData);
      setIimageDisplay(data.result.image);
    }
  }, [data]);

  //
  const [isLoading, setIsLoading] = useState(!true);
  const [userInput, setUserInput] = useState(menuItemData);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const [imageToDataBase, setIimageToDataBase] = useState<any>();
  const [imageDisplay, setIimageDisplay] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split('/')[1];
      const validTypes = ['jpeg', 'jpg', 'png'];
      const isImageTypeValid = validTypes.filter((e) => {
        return e === imgType;
      });
      if (file.size > 5000 * 1024) {
        setIimageToDataBase('');
        toastPop('File must be less than 5MB', SD.TOAST_WARNING);
        return;
      } else if (isImageTypeValid.length === 0) {
        setIimageToDataBase('');
        toastPop('File must be in jpeg, jpg, png', SD.TOAST_WARNING);
        return;
      }
    }
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    setIimageToDataBase(file);
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      setIimageDisplay(imgUrl);
    };
  };
  const navigate = useNavigate();

  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!imageToDataBase && !id) {
      toastPop('Image not found, please add an image', SD.TOAST_WARNING);
      setIsLoading(!true);
      return;
    }
    const formData = new FormData();
    formData.append('Name', userInput.name);
    formData.append('Description', userInput.description);
    formData.append('SpecialTag', userInput.specialTag ?? '');
    formData.append('Category', userInput.category);
    formData.append('Price', userInput.price);
    if (imageToDataBase) formData.append('Image', imageToDataBase);

    let response: apiResponse;
    if (id) {
      formData.append('id', id);
      response = await updateMenuItem({ data: formData, id });

      if (response.data?.isSuccess) {
        toastPop('Successfully edit item', SD.TOAST_SUCCESS);

        navigate('/MenuItemsAdmin/MenuItemList');
        setIsLoading(!true);
      } else {
        toastPop('There were some errors, please try agaim ', SD.TOAST_ERROR);
        console.log(response);
      }
    } else {
      response = await createMenuItem(formData);

      if (response.data?.isSuccess) {
        toastPop('Successfully upload new item', SD.TOAST_SUCCESS);

        navigate('/MenuItemsAdmin/MenuItemList');
        setIsLoading(!true);
      } else {
        toastPop('There were some errors, please try agaim ', SD.TOAST_ERROR);
        console.log(response);
      }
    }

    setIsLoading(!true);
  };
  return (
    <div className="container ">
      <div className="card ">
        <div className="card-header bg-gradient p-3 h2 text-info">
          {id ? 'Update Item' : 'Create Item'}
        </div>

        {isLoading ? (
          <LoaderBig></LoaderBig>
        ) : (
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row mt-3">
              <div className="col-md-5 offset-1">
                <input
                  type="text"
                  className="form-control  bg-secondary text-white"
                  placeholder="Enter Name"
                  name="name"
                  value={userInput.name}
                  onChange={handleMenuItemInput}
                  required
                />
                <textarea
                  className="form-control  bg-secondary text-white mt-3"
                  placeholder="Enter Description"
                  name="description"
                  value={userInput.description}
                  onChange={handleMenuItemInput}
                  rows={5}
                  required
                ></textarea>
                <input
                  type="text"
                  className="form-control  bg-secondary text-white mt-3"
                  placeholder="Enter Special Tag"
                  name="specialTag"
                  value={userInput.specialTag}
                  onChange={handleMenuItemInput}
                />
                <select
                  className="form-control form-select bg-secondary text-white mt-3"
                  placeholder="Select Category"
                  name="category"
                  value={userInput.category}
                  onChange={handleMenuItemInput}
                >
                  {Categories.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control  bg-secondary text-white mt-3"
                  required
                  placeholder="Enter Price"
                  name="price"
                  value={userInput.price}
                  onChange={handleMenuItemInput}
                />
                <input
                  type="file"
                  className="form-control  bg-secondary text-white mt-3"
                  onChange={handleFileChange}
                />
                <div className="text-center">
                  <button
                    type="submit"
                    style={{ width: '50%' }}
                    className="btn btn-success mt-5 mb-5"
                  >
                    {id ? 'Update ' : 'Create '}
                  </button>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <img
                  src={imageDisplay}
                  style={{ width: '100%', borderRadius: '30px' }}
                  alt=""
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MenuItemUpser;
