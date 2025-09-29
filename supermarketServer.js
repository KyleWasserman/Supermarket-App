const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = 5000;

let items = [];  

function startCommandLine() {
    console.log('Type itemsList or stop to shutdown the server: ');
    const stdin = process.openStdin();
    stdin.addListener('data', (input) => {
        const command = input.toString().trim();
        if (command === 'stop') {
            console.log('Shutting down the server');
            process.exit(0);
        } else if (command === 'itemsList') {
            console.log('[');
            items.forEach((item, index) => {
                const itemString = `{ name: "${item.name}", cost: ${item.cost.toFixed(2)} }`;
                console.log(`  ${itemString}${index < items.length - 1 ? ',' : ''}`);
            });
            console.log(']');
            
            console.log('Type itemsList or stop to shutdown the server: ');
        } else {
            console.log(`Invalid command: ${command}`);
            console.log('Type itemsList or stop to shutdown the server: ');
        }
    });
}

function loadItems(jsonFile) {
    try {
        const data = fs.readFileSync(jsonFile, 'utf8');
        const parsedData = JSON.parse(data);
        items = parsedData.itemsList;
    } catch (err) {
        console.error('Error loading JSON file:', err.message);
        process.exit(1);
    }
}

if (process.argv.length !== 3) {
    console.log('Usage supermarketServer.js jsonFile');
    process.exit(1);
} else {
    loadItems(process.argv[2]);
}

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'templates', 'index.ejs'));
});

app.get('/catalog', (req, res) => {
    const itemsTable = `
        <table border="1">
            <tr>
                <th>Item</th>
                <th>Cost</th>
            </tr>
            ${items.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.cost.toFixed(2)}</td>
                </tr>
            `).join('')}
        </table>
    `;
    
    res.render(path.join(__dirname, 'templates', 'displayItems.ejs'), { itemsTable });
});

app.get('/order', (req, res) => {
    const itemsOptions = items.map(item => `
        <option value="${item.name}">${item.name}</option>
    `).join('');

    res.render(path.join(__dirname, 'templates', 'placeOrder.ejs'), { items: itemsOptions });
});

app.post('/order', (req, res) => {
    const { name, email, delivery, itemsSelected } = req.body;
    const orderedItems = items.filter(item => itemsSelected.includes(item.name));
    const totalCost = orderedItems.reduce((total, item) => total + item.cost, 0).toFixed(2);
    const orderTable = `
        <table border="1">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                ${orderedItems.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.cost.toFixed(2)}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td>Total Cost:</strong></td>
                    <td>${totalCost}</strong></td>
                </tr>
            </tbody>
        </table>
    `;

    res.render(path.join(__dirname, 'templates', 'orderConfirmation.ejs'), {
        name,
        email,
        delivery,
        orderTable
    });
});

app.listen(PORT, () => {
    console.log(`Web server started and running at http://localhost:${PORT}`);
    startCommandLine(); 
});
