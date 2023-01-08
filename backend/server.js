const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = 5001;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

router.use(cors());

const tenantDirectory = '/tenants.json';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/add', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

    const data = fs.readFileSync(path.join(__dirname, tenantDirectory));
    const tenants = JSON.parse(data);
    const newData = {}
    newData['tenants'] = []
    
    const newTenant = req.body;
    newTenant['package'] = '';
    newTenant['email'] = '';

    const insertTenant = {}
    insertTenant[tenants.tenants.length] = newTenant;
    combinedTenants = {...tenants.tenants, ...insertTenant}

    Object.keys(combinedTenants).forEach((e, i) => {
        newData['tenants'][i] = combinedTenants[e];
    })

    fs.writeFile(path.join(__dirname, tenantDirectory), JSON.stringify(newData), (err) => {
        if (err) throw err;
    });
    res.send(req.body);
})

app.post('/update/:id', (req,res) => {
    const id = req.params.id;
    const data = fs.readFileSync(path.join(__dirname, tenantDirectory));
    const tenants = JSON.parse(data);
    
    tenants.tenants.forEach(tenant => {
        if (id === tenant.name) {
            tenant.package === "P" ? tenant.package = "" : tenant.package = "P";
            fs.writeFile(path.join(__dirname, tenantDirectory), JSON.stringify(tenants), (err) => {
                if (err) throw err;
                console.log(`${tenant.name}'s package has been updated to ${tenant.package}`);
            })
            console.log(tenants);
            res.send(tenants);
        }
    })
});

app.post('/remove', (req, res) => {
    const targetTenant = req.body;

})

app.get('/tenants', (req, res) => {
    fs.readFile(path.join(__dirname, tenantDirectory), 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data)
    });
});


app.listen(port, () => console.log(`listening on port ${port}`))