const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB (make sure to replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://warisamir1918:waris1918@cluster0.2wvsbor.mongodb.net/waris?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
    console.log("db connected");
}).catch((e) => console.log("db failed", e.message));

const expenseSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    date: Date,
});

const Expense = mongoose.model('Expense', expenseSchema);

app.get('/expenses', async(req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post('/expenses', async(req, res) => {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.json(newExpense);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
