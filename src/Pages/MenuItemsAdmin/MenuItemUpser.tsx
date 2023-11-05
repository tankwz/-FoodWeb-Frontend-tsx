import React, { useState } from 'react';
import { inputHelper, toastPop } from '../../Helper';
import { SD } from '../../Util/SD';

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
  return (
    <div className="container ">
      <div className="card ">
        <div className="card-header bg-gradient p-3 h2 text-info">
          Edit Item
        </div>

        <form method="post" encType="multipart/form-data">
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
      </div>
    </div>
  );
}

export default MenuItemUpser;
