const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/amazon-clone', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect('mongodb://127.0.0.1:27017/amazon-clone', {
     useNewUrlParser: true,
     useUnifiedTopology: true
     })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Connection error:', error);
    });

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    description: String
}));

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// app.post('/products', async (req, res) => {
//     const product = new Product(req.body);
//     await product.save();
//     res.send(product);
// });

app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

const PORT = 3020;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
