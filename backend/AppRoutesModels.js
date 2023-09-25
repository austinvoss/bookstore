const express = require("express");
const { Pool } = require("pg");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3001;

// Database Connection
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "voss",
  password: "none",
  database: "voss",
});

// Middlewares
app.use(express.json());

// JWT Middleware
const jwtMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Book Routes
app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Books");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM Books WHERE id = $1", [
      bookId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Registration
app.post(
  "/api/users/register",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await pool.query("INSERT INTO Users (email, password) VALUES ($1, $2)", [
        email,
        hashedPassword,
      ]);
      res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// User Login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          "your-secret-key",
          { expiresIn: "1h" }
        );
        res.json({ message: "User logged in", token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch all orders for a user
app.get("/api/orders/:userId", jwtMiddleware, async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query("SELECT * FROM Orders WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  const { userId, bookId, quantity } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Orders (user_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, bookId, quantity]
    );
    res.status(201).json({ message: "Order created", order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connection successful:", res.rows[0]);
  }
});
