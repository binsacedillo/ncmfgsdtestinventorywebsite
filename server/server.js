// Import required libraries
import express from "express"
import mysql from "mysql"
import cors from "cors"

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for the app
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "ncmfgsdinventory"
});

// Handle GET request to the root endpoint
app.get('/', (req, res) => {
    // SQL query to select all data from the 'datas' table
    const sql = "SELECT * FROM datas";
    // Execute the query and handle the result or error
    db.query(sql, (err, result) => {
        // If there's an error, send an error response; otherwise, send the result as JSON
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

// Handle POST request to the '/datas' endpoint
app.post('/datas', (req, res) => {
    // SQL query to insert data into the 'datas' table
    const sql = "INSERT INTO datas (`name`, `unit`, `quantity`, `datetime`, `supplier`) VALUES (?)";
    // Extract values from the request body
    const values = [
        req.body.name,
        req.body.unit,
        req.body.quantity,
        req.body.datetime,
        req.body.supplier
    ]
    // Execute the query with the provided values and handle the result or error
    db.query(sql, [values], (err, result) => {
        // If there's an error, send an error response; otherwise, send the result as JSON
        if (err) return res.json(err);
        return res.json(result);
    })
})

// Handle GET request to read a specific entry from the 'datas' table
app.get('/read/:id', (req, res) => {
    // SQL query to select a specific entry based on the provided ID
    const sql = "SELECT * FROM datas WHERE ID = ?";
    // Extract ID from the request parameters
    const id = req.params.id;
    // Execute the query with the provided ID and handle the result or error
    db.query(sql, [id], (err, result) => {
        // If there's an error, send an error response; otherwise, send the result as JSON
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

// Handle PUT request to update a specific entry in the 'datas' table
app.put('/update/:id', (req, res) => {
    // SQL query to update a specific entry based on the provided ID
    const sql = 'UPDATE datas SET `Name` =?, `Unit` =?, `Quantity` =? , `datetime` =? , `supplier` =? WHERE ID=? ';
    // Extract ID from the request parameters
    const id = req.params.id;
    // Execute the query with the provided values and ID, and handle the result or error
    db.query(sql, [req.body.name, req.body.unit, req.body.quantity, req.body.datetime, req.body.supplier, id], (err, result) => {
        // If there's an error, send an error response; otherwise, send the result as JSON
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

// Handle POST request to truncate (clear) the 'datas' table
app.post('/', (req, res) => {
    // SQL query to truncate the 'datas' table
    db.query('TRUNCATE TABLE datas', function (err, results, fields) {
        // If there's an error, throw an error; otherwise, send a success response
        if (err) throw err;
        res.send('Table truncated');
    });
});

// Handle DELETE request to delete a specific entry from the 'datas' table
app.delete('/delete/:id', (req, res) => {
    // SQL query to delete a specific entry based on the provided ID
    const sql = 'DELETE FROM datas WHERE ID = ?';
    // Extract ID from the request parameters
    const id = req.params.id;
    // Execute the query with the provided ID and handle the result or error
    db.query(sql, id, (err, result) => {
        // If there's an error, send an error response; otherwise, send a success response
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ Message: "Data deleted successfully" });
    });
});

// Start the Express server on port 8081 and log a message when it's running
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
})
