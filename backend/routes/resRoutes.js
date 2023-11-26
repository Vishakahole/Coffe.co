const express= require("express")
const router= express.Router()
const Restaurant= require("../models/Restaurant")
const Customer= require("../models/Customer")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer=require('multer');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Cart= require("../models/Cart")
const Order= require("../models/Orders")
const mongoose=require("mongoose");

router.get('/api/restaurant-manager/details/:managerId', async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({ manager: req.params.managerId });
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to update the restaurant's name
router.put('/api/restaurant-manager/update-restaurant-name', async (req, res) => {
    const { managerId, name } = req.body;
    try {
      const restaurant = await Restaurant.findOneAndUpdate(
        { manager: managerId },
        { Res_name:name },
        { new: true }
      );
      res.json({ message: 'Restaurant name updated successfully', restaurant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
  });

const upload = multer({ storage: storage });

  // Route to add a menu item
  router.post('/api/restaurant-manager/add-menu-item', upload.single('pic'), async (req, res) => {
    const { managerId, name, price } = req.body;
    
    console.log("managerId",managerId);
    const pic = req.file.filename;
    
    try {
      const restaurant = await Restaurant.findOne({ manager: managerId });
      if (restaurant) {
        // Assuming "EmenuCard" is an array of objects
        restaurant.EmenuCard.push({ name, price,pic });
        await restaurant.save();
        res.json({ message: 'Menu item added successfully', restaurant });
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.delete('/api/restaurant-manager/delete-menu-item/:managerId/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const managerId = req.params.managerId; // You can pass the managerId from the frontend if needed
   console.log("itemId",itemId);
   console.log("managerId",managerId);
    try {
      const restaurant = await Restaurant.findOne({ manager: managerId });
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Find the menu item index in the array based on the itemId
      const menuItemIndex = restaurant.EmenuCard.findIndex(item => item._id.toString() === itemId);
  
      if (menuItemIndex === -1) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Remove the menu item from the array
      restaurant.EmenuCard.splice(menuItemIndex, 1);
  
      await restaurant.save();
      res.json({ message: 'Menu item deleted successfully', restaurant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to add an item to the customer's cart
  router.post('/cart/add-to-cart/:customerId', async (req, res) => {
    const { item } = req.body; // Item object containing name, price, pic, and quantity
    const customerId = req.params.customerId;
  
    try {
      // Convert customerId to a valid ObjectId
      const customerObjectId = new mongoose.Types.ObjectId(customerId);
  
      // Find the customer by their userId (which should be equal to customerId)
      const customer = await Customer.findOne({ userId: customerObjectId });
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Create or find the customer's cart
      let cart = await Cart.findOne({ customer: customer._id });
  
      if (!cart) {
        cart = new Cart({ customer: customer._id, items: [] });
      }
  
      // Add the item to the cart
      const cartItem = {
        name: item.name,
        price: item.price,
        pic: item.pic,
        quantity: item.quantity, // Add the quantity to the cart item
      };
  
      cart.items.push(cartItem);
      await cart.save();
  
      res.json({ message: 'Item added to the cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.get('/get-cart/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Find the customer by their ID
    const customer = await Customer.findOne({ userId: customerId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Assuming you have a separate model for Cart items, fetch the items associated with the customer's cart
    const cartItems = await Cart.find({ customer: customer._id }).populate('items');

    res.json({ items: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/cart/remove-from-cart/:customerId', async (req, res) => {
  const { itemId } = req.body;
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findOne({ userId: customerId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the customer's cart and remove the item based on the itemId
    const cart = await Cart.findOne({ customer: customer._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for the customer' });
    }

    // Remove the item with the specified itemId from the cart
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();

    res.json({ message: 'Item removed from the cart', updatedItems: cart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/api/customer/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    // Use the customer ID to find the customer in your database
    const customer = await Customer.findOne({ userId: customerId });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Return the customer details as a JSON response
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customer details' });
  }
});


// Route to place an order
router.post('/place-order/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const {cartItems ,deliveryAddress}= req.body; // Array of cart items
    // console.log("deliveryAdd",deliveryAddress);

    const customerObjectId = new mongoose.Types.ObjectId(customerId);
    const customer = await Customer.findOne({ userId: customerObjectId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create an empty order object with initial total as 0
    const order = {
      fooditems: [],
      total: 0,
      customer: customer._id,
      orderDate: new Date(),
      deliveryAdd:deliveryAddress,
    };

    // Process the cart items to update quantities or add new items
    cartItems.forEach((cartItem) => {
      const existingItem = order.fooditems.find((item) => item.name === cartItem.name);

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += cartItem.quantity;
      } else {
        // Add the new item to the order
        order.fooditems.push({
          name: cartItem.name,
          price: cartItem.price,
          quantity: cartItem.quantity,
        });
      }

      // Update the total price
      order.total += cartItem.price * cartItem.quantity;
    });

    // Create a new order document in the database
    const newOrder = new Order(order);
    await newOrder.save();

    // Empty the customer's cart (assuming you have a cart model)
    const cart = await Cart.findOne({ customer: customer._id });
    if (cart) {
      cart.items = []; // Remove all items from the cart
      await cart.save();
    }

    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing the order' });
  }
});

router.get('/api/get-all-orders/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerObjectId = new mongoose.Types.ObjectId(customerId);
    // Use the customer ID to find the customer in your database
    const customer = await Customer.findOne({ userId: customerObjectId });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const order = await Order.find({ customer: customer._id });

    // Return the customer details as a JSON response
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customer details' });
  }
});



module.exports=router;