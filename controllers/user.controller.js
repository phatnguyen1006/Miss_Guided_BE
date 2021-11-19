const userService = require("../services/user.service");

module.exports.postRegister = async (req, res) => {
  const UserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    wishlist: req.body.wishlist,
    cart: req.body.cart,
    dob: req.body.dob,
  };

  const isEmailExisted = await userService.loginUser({ email: req.body.email });
  if (isEmailExisted) {
    res.status(401).json({ message: "Exsisted Email !!" });
    return;
  }

  //Register user
  const registeredUser = await userService.registerUser(UserData);

  if (registeredUser) {
    res.status(200).json({ user: registeredUser });
  } else {
    res.status(400).json({ message: "Fail to register!!!" });
  }
};

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  if (!password)
    return res.status(401).json({ message: "Please enterpassword" });

  let data = { email, password };

  let findUser = await userService.loginUser(data);

  if (findUser) {
    // return res.status(200).json({ "message": login });
    if (findUser == 200) {
      return res.status(200).json({ user: findUser });
    } else if (findUser == 401) {
      return res.status(401).json({ message: "Wrong password !!!" });
    }
  } else {
    return res.status(401).json({ message: "Fail to login" });
  }
};

module.exports.findUser = async (req, res) => {
  var email = req.body.email;

  const userFound = await userService.findUser(email);

  if (userFound) {
    return res.status(200).json({ user: userFound });
  } else {
    return res.status(400).json({ message: "Faild to find user" });
  }
};

module.exports.addToCart = async (req, res) => {
  const { email, newProduct } = req.body;

  const onUpdateCart = await userService.updateCart(email, newProduct);

  if (onUpdateCart) {
    res.status(200).json({ message: onUpdateCart });
  } else {
    res.status(400).json({ message: "Add to cart failed !!!" });
  }
};

module.exports.removeFromCart = async (req, res) => {
  const { email, productId } = req.body;

  const onUpdateCart = await userService.removeFromCart(email, productId);

  if (onUpdateCart) {
    res.status(200).json({ message: "Remove successfully" });
  } else {
    res.status(400).json({ message: "Remove from cart failed !!!" });
  }
};

module.exports.addToWishlist = async (req, res) => {
  const { email, newProduct } = req.body;

  const onUpdateWishlist = await userService.updateWishlist(email, newProduct);

  if (onUpdateWishlist) {
    res.status(200).json({ message: onUpdateWishlist });
  } else {
    res.status(400).json({ message: "Add to cart failed !!!" });
  }
};
