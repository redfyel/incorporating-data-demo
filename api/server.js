import express from "express";
import cors from "cors";
import multer from "multer";
import serverless from "serverless-http";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization"
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Requesting Data
app.get("/api/coffees", (req, res) => {
  res.json([
    {
      "id": 1,
      "title": "Black Coffee",
      "size": "Medium"
    },
    {
      "id": 2,
      "title": "Latte",
      "size": "Large"
    },
    {
      "id": 3,
      "title": "Caramel Latte",
      "size": "Large"
    },
    {
      "id": 4,
      "title": "Cappuccino",
      "size": "Medium"
    },
    {
      "id": 5,
      "title": "Espresso",
      "size": "Small"
    },
    {
      "id": 6,
      "title": "Macchiato",
      "size": "Small"
    },
    {
      "id": 7,
      "title": "Mocha",
      "size": "Large"
    },
    {
      "id": 8,
      "title": "Hot Chocolate",
      "size": "Medium"
    },
    {
      "id": 9,
      "title": "Chai Latte",
      "size": "Large"
    },
    {
      "id": 10,
      "title": "Matcha Latte",
      "size": "Large"
    }
  ]
  );
});

// Sending Data
app.post("/api/order", (req, res) => {
  const { coffee, size } = req.body;
  res.json({ message: `Order placed: ${size} ${coffee}` });
});

// Uploading Files
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

// Authorized Requests
app.get("/api/vip-orders", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer secret-shelian-token") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const vipOrders = [
    {
      "order_id": 101,
      "customer": "Elon M.",
      "coffee_id": 5,
      "size": "Small",
      "quantity": 2,
      "special_request": "Extra strong, no sugar"
    },
    {
      "order_id": 102,
      "customer": "Beyoncé",
      "coffee_id": 3,
      "size": "Large",
      "quantity": 1,
      "special_request": "Oat milk, extra caramel"
    },
    {
      "order_id": 103,
      "customer": "Bill G.",
      "coffee_id": 7,
      "size": "Large",
      "quantity": 1,
      "special_request": "No whipped cream"
    },
    {
      "order_id": 104,
      "customer": "Taylor S",
      "coffee_id": 9,
      "size": "Large",
      "quantity": 2,
      "special_request": "Coconut milk, extra cinnamon"
    },
    {
      "order_id": 105,
      "customer": "Shelian Gladis",
      "coffee_id": 1,
      "size": "Medium",
      "quantity": 3,
      "special_request": "Black, no sugar"
    }
  ]
  
  res.json({ message: "Here are your exclusive VIP orders" , payload: vipOrders});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default serverless(app);
