Hi, this is a readme for my food ordering website using React and TypeScript.

This website is a personal project I made to practice and learn React concepts with instructions from [Mr. Bhrugen](https://www.dotnetmastery.com/).

Live website link: [https://main.d245fjjr2entuj.amplifyapp.com/](https://main.d245fjjr2entuj.amplifyapp.com/)

There are only 2 types of users (for now), and you can register as an admin user with full permissions (please don't delete any data that you didn't add).

Pages (for everyone):

[[/Login](https://main.d245fjjr2entuj.amplifyapp.com/login)]

[[/Register](https://main.d245fjjr2entuj.amplifyapp.com/register)]

[[/Home](https://main.d245fjjr2entuj.amplifyapp.com/)]

[[/Food Details](https://main.d245fjjr2entuj.amplifyapp.com/MenuItemDetails/2)]

Pages (for logged-in customer users):

[[/Shopping Cart](https://main.d245fjjr2entuj.amplifyapp.com/ShoppingCart)]

[[/Checkout](https://main.d245fjjr2entuj.amplifyapp.com/Checkout)] you need to select an item from the [[/Shopping Cart](https://main.d245fjjr2entuj.amplifyapp.com/ShoppingCart)] page by clicking on the description or image first

[[/Edit Checkout Detail](https://main.d245fjjr2entuj.amplifyapp.com/editcheckout)] you need to access this page from the checkout page

[[/Orders List](https://main.d245fjjr2entuj.amplifyapp.com/order/ordersList)] Order List for Customer user, customers can see all their orders here

[[/Order Details](https://main.d245fjjr2entuj.amplifyapp.com/order/orderDetails/)] Order Details page, you need to access this page from [[/Orders List](https://main.d245fjjr2entuj.amplifyapp.com/order/ordersList)] page so it has an id to process, customers can cancel their orders if its not completed yet

Pages (for admin users):
Admin users can access and perform all customer user tasks. Additionally, they can access

[[/All Orders](https://main.d245fjjr2entuj.amplifyapp.com/order/OrdersListAdmin)] Order List for Admin user, admin can see all user orders here

[[/Order Details](https://main.d245fjjr2entuj.amplifyapp.com/order/orderDetails/)] Order Details page, you need to access this page from [[/All Orders](https://main.d245fjjr2entuj.amplifyapp.com/order/OrdersListAdmin)] page so it has an id to process, if the user is admin, they can update the order status right here with Confirm, Ready, Completed or Cancel button

[[/Menu Item List](https://main.d245fjjr2entuj.amplifyapp.com/MenuItemsAdmin/MenuItemList)] This is where admin users can add/update/delete menu items. Since I purposely let you register as an admin user for testing purposes, please don't mess up my preset data. thank you
