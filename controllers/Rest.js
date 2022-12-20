const fs = require( 'fs/promises' );
const { type } = require('os');
const path = require( 'path' );
const { send } = require('process');

const pathJSON = path.join(__dirname, '../data/data.json');

// Leer el Archivo JSON donde se guarda la información
const toRead = async() =>{
    const data = await fs.readFile(pathJSON, 'utf-8');    

    return data;
}
// Escribir el Archivo JSON 
const toWrite = async(data) => {
    data = JSON.stringify(data);
    await fs.writeFile(pathJSON, data);

    return await toRead();
}


// Peticiones GET
async function GetRequest(req, res){
    try{
        const data = await toRead();


        if(req.url == '/api/employees'){
            res.send(data);
        }
        else if(Object.keys(req.params).length){
            res.send(data.Employees.find(c => c.id === parseInt(req.params.id)));
        }
        else{
            res.send('no se ha podido dar respuesta');
        }
        console.log('GET Request successful...');

    }
    catch (err){
        console.log('GET Request has failed...');
        console.log(err);
        res.send(err);
    }
}

// Peticiones POST
async function PostRequest(req, res){
    try{
        let data = await toRead();
        data = JSON.parse(data);

        const total = Object.keys(data.Employees).length;
        const newId = (1 + data.Employees[total-1].id);

        const employee = {
            id: newId,
            name: req.body.name,
            lastName: req.body.lastName,
            status: req.body.status,
            Rdate: req.body.Rdate
        }

        data.Employees.push(employee);

        const newJSON = await toWrite(data);

        console.log('POST Request successful...');
        res.send(JSON.stringify(newJSON));
    }
    catch (err){
        console.log('POST Request has failed...');
        console.log(err);
        res.send(err)
    }
}

// Peticiones PUT
async function PutRequest(req, res){
    try{
        let data = await toRead();
        data = JSON.parse(data)
        const employee = data.Employees.find(c => c.id === parseInt(req.params.id));

        employee.name = req.body.name || employee.name;
        employee.lastName = req.body.lastName || employee.lastName;
        employee.status = req.body.status || employee.status;
        employee.Rdate = req.body.Rdate;

        data.Employees[data.Employees.indexOf(employee)] = employee;

        const newJSON = await toWrite(data);

        console.log('PUT Request successful...');
        res.send(newJSON);
    }
    catch(err){
        console.log('PUT Request has failed...');
        console.log(err);
        res.send(err)   
    }
}

// Peticiones DELETE
async function DeleteRequest(req, res){
    try{
        let data = await toRead();
        data = JSON.parse(data);
        const employee = data.Employees.find(c => c.id === parseInt(req.params.id));
        if (!employee) return res.status(404).send('Empleado no existe');

        const index = data.Employees.indexOf(employee);
        data.Employees.splice(index, 1);

        const newJSON = await toWrite(data);

        console.log('DELETE Request successful...');
        res.send(newJSON);
    }
    catch(err){
        console.log('DELETE Request has failed...');
        console.log(err);
        res.send(err)
    }
}

module.exports = { GetRequest, PostRequest, PutRequest, DeleteRequest }