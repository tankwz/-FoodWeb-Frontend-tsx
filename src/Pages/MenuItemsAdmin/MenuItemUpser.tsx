import React, { useState } from 'react';
import { inputHelper, toastPop } from '../../Helper';
import { SD } from '../../Util/SD';
import { LoaderBig } from '../../Components/Page/Utility';
import { useCreateMenuItemMutation } from '../../api/menuItemApi';
import { apiResponse } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: '',
  price: '',
};

function MenuItemUpser() {
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!imageToDataBase) {
      toastPop('Image not found, please add an image', SD.TOAST_WARNING);
      setIsLoading(!true);
      return;
    }
    const formData = new FormData();
    formData.append('Name', userInput.name);
    formData.append('Description', userInput.description);
    formData.append('SpecialTag', userInput.specialTag);
    formData.append('Category', userInput.category);
    formData.append('Price', userInput.price);
    formData.append('Image', imageToDataBase);

    const response: apiResponse = await createMenuItem(formData);
    if (response.data?.isSuccess) {
      toastPop('Successfully upload new item', SD.TOAST_SUCCESS);
      navigate('/MenuItemsAdmin/MenuItemList');
      setIsLoading(!true);
    } else {
      toastPop(
        'There were some errors uploading, please try agaim ',
        SD.TOAST_ERROR
      );
      console.log(response);
    }
    setIsLoading(!true);
  };
  return (
    <div className="container ">
      <div className="card ">
        <div className="card-header bg-gradient p-3 h2 text-info">
          Create Item
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
                <input
                  type="text"
                  className="form-control  bg-secondary text-white mt-3"
                  placeholder="Enter Category"
                  name="category"
                  value={userInput.category}
                  onChange={handleMenuItemInput}
                />
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
                    Submit
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
