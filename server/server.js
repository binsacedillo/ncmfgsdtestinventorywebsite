import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ncmfgsdinventory"
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdb'
});

connection.connect();

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM Users', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/login', (req, res) => {

    const { username, password } = req.body;

    connection.query(
        'SELECT * FROM Users WHERE username = ? AND password = ?',
        [username, password],
        (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json({ msg: 'Login successful' });
            } else {
                res.json({ msg: 'Invalid credentials' });
            }
        }
    );
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM datas";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" }); return res.json(result);
    })
})

app.post('/datas', (req, res) => {
    const sql = "INSERT INTO datas (`name`, `unit`, `quantity`, `datetime`, `supplier`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.unit,
        req.body.quantity,
        req.body.datetime,
        req.body.supplier
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM datas WHERE ID = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" }); return res.json(result);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE datas SET `Name` =?, `Unit` =?, `Quantity` =? , `datetime` =? WHERE ID=?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.unit, req.body.quantity, req.body.datetime, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" }); return res.json(result);
    })
})

app.post('/', (req, res) => {
    db.query('TRUNCATE TABLE datas', function (err, results, fields) {
        if (err) throw err;
        res.send('Table truncated');
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM datas WHERE ID = ?';
    const id = req.params.id;
    db.query(sql, id, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json({ Message: "Data deleted successfully" });
    });
});

app.listen(8081, () => {
    console.log("getting datas");
})

app.listen(3000, () => {
    console.log('getting users');
});