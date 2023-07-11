const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51NIt6KSCaxNQvXKqVKxEo1lI3ryx6HhOTgdCT1OWqERBLTc29T6SOEh7JvnOGabCJsCX9BqJ5ZWWg5pr127qnbNb00Gzcc3Qgy"
);

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 8090;
const secret = "your-secret-key"; // Define your secret key for JWT

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/MERN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
});

// Create a model based on the schema
const User = mongoose.model("USERDATA", userSchema);

// Generate a JWT
function generateToken(user) {
  const token = jwt.sign({ user }, secret, { expiresIn: "7d" });
  return token;
}

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Register API
app.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await User.findOne({ email: email }).exec();

    if (result) {
      res.send({ message: "Email is Already Registered", alert: false });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.send({ message: "Successfully Signed Up", alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Login API

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user) {
      // Check if the provided password matches the stored password
      if (user.password === password) {
        const datasend = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        const token = generateToken(datasend);

        res.send({
          message: "Login Successfully",
          alert: true,
          data: datasend,
          token, // Include the token in the response
        });
      } else {
        res.send({ message: "Incorrect password", alert: false });
      }
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging user");
  }
});

// Restricted route - example
app.get("/restricted", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.name}. This is a restricted route.`);
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Logout API
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error logging out");
    } else {
      res.send("Logged out successfully");
    }
  });
});

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  brand: String,
  image: String,
  description: String,
});

// Product model
const Product = mongoose.model("PRODUCT", productSchema);

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving products");
  }
});

// Create a new product
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating product");
  }
});

// Get a specific product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).exec();

    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving product");
  }
});

// Update a product
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    ).exec();

    if (updatedProduct) {
      res.send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating product");
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();

    if (deletedProduct) {
      res.send({ message: "Product deleted successfully" });
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
});
// ... REST OF THE CODE ...

// Order schema
const orderSchema = new mongoose.Schema({
  cart: [productSchema], // Assuming you have a product schema defined
  totalPrice: Number,
  userId: String,
  userName: String, // Assuming you have a userId stored in the order
});

// Order model
const Order = mongoose.model("ORDER", orderSchema);

// Place an order
app.post("/api/orders", async (req, res) => {
  const { cart, totalPrice, userId, userName } = req.body;

  try {
    let existingOrder = await Order.findOne({ userId: userId });
    if (existingOrder) {
      // If an order exists for the user, update the existing order
      existingOrder.cart.push(...cart);
      existingOrder.totalPrice += totalPrice;
      await existingOrder.save();
      res.send({ message: "Order updated successfully", order: existingOrder });
    } else {
      // If no order exists for the user, create a new order
      const newOrder = new Order({
        cart,
        totalPrice,
        userId,
        userName,
      });
      await newOrder.save();
      res.send({ message: "Order placed successfully", order: newOrder });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error placing order");
  }
});

//Get Order Data
app.get("/api/orders/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderData = await Order.findById(orderId);
    if (!orderData) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving order");
  }
});

//shipping
// Create a schema for the shipping data
const shippingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  mobileNumber: String,
});

// Create a model based on the schema
const Shipping = mongoose.model("Shipping", shippingSchema);

// Middleware
app.use(bodyParser.json());

// Handle POST request to /api/shipping
app.post("/api/shipping", (req, res) => {
  const formData = req.body;

  // Create a new document using the Shipping model
  const shipping = new Shipping(formData);

  // Save the shipping data to the database
  shipping
    .save()
    .then(() => {
      res.send("Shipping data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving shipping data:", error);
      res.status(500).send("An error occurred while saving the shipping data");
    });
});
//Get
// Handle GET request to /api/shipping
app.get("/api/shipping", (req, res) => {
  // Retrieve all shipping documents from the database
  Shipping.find()
    .then((shippingData) => {
      res.send(shippingData);
    })
    .catch((error) => {
      console.error("Error retrieving shipping data:", error);
      res
        .status(500)
        .send("An error occurred while retrieving the shipping data");
    });
});

//Api for Payment
app.post("/payment/create", async (req, res) => {
  const total = req.body.totalprice;
  const amountInPaise = Math.floor(total * 100); // Convert total amount to paise

  console.log("Payment Request Received For The Rupees", total);

  const payment = await stripe.paymentIntents.create({
    amount: amountInPaise,
    currency: "inr"
  });

  res.status(201).send({
    clientSecret: payment.client_secret
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
