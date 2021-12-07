const Users = require("../models/user.model");
const productServices = require("../services/product.service");
const { compare } = require("../helper/comparePassword");

async function registerUser(data) {
  try {
    const newUser = new Users(data);

    const saveUser = await newUser.save();

    if (saveUser) console.log("Register successful");
    else console.log("Error in creating new user");

    return saveUser;
  } catch (error) {
    console.log("Error in creating user: ", error.message);
    throw error;
  }
}

async function loginUser(data) {
  try {
    const userFound = await Users.findOne({ email: data.email });

    if (userFound) {
      return compare(data.password, userFound.password) ? 200 : 401;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error in login user: ", err.message);
  }
}

async function updateUser(email, data) {
  const userUpdate = await Users.findOneAndUpdate(
    {
      email: email,
    },
    data,
    {
      new: true,
    },
    (error) => {
      if (!err) console.log("Update user successful!");
      else console.log("Udate user failed!");
    }
  );

  return userUpdate;
}

async function findUser(email) {
  try {
    const userFound = await Users.findOne({ email: email });

    if (userFound) {
      return userFound;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error in login user: ", err.message);
  }
}

async function getCart(email) {
  // If Cart [] || Cart !- []
  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return null;
    }

    return user.cart;
  } catch (err) {
    return null;
  }
}

async function updateCart(email, newProductId) {
  // If Cart [] || Cart !- []
  try {
    const user = await Users.findOne({ email: email });

    user.cart.push(newProductId);
    await user.save();

    return user;
  } catch (err) {
    return null;
  }
}

async function updateWishlist(email, newProductId) {
  // If Cart [] || Cart !- []
  try {
    const user = await Users.findOne({ email: email });

    user.wishlist.push(newProductId);
    await user.save();

    return user;
  } catch (err) {
    return null;
  }
}

async function removeFromCart(email, productId) {
  try {
    const user = await Users.findOne({ email: email }).lean();
    let cart = user.cart.filter((c) => c == productId);

    if (user) {
      var result = await Users.findOneAndUpdate(
        { email: email },
        {
          cart: cart,
        },
        {
          new: true,
        }
      );
    }

    if (result) {
      return true;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function removeFromWishList(email, productId) {
  try {
    const user = await Users.findOne({ email: email });

    removeElement(user.wishlist, productId);
    await user.save();

    return user;
  } catch (err) {
    return null;
  }
}

async function addToOrderHistory(email, newProductId) {
  // If Cart [] || Cart !- []
  try {
    const user = await Users.findOne({ email: email });

    user.ordered.push(newProductId);
    await user.save();

    return user;
  } catch (err) {
    return null;
  }
}

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getCart,
  updateCart,
  updateWishlist,
  removeFromWishList,
  findUser,
  removeFromCart,
  addToOrderHistory,
};
