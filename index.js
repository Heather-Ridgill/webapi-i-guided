const express = require(`express`);
const db = require(`./data/hubs-model`);

const server = express();

server.listen(4000, () => {
    console.log(`=== server listening on port 4000 ===`);
});

//Middleware (last)
server.use(express.json());



//Route Handler

server.get(`/`, (req, res) => {
    res.send(`Hello World...`);
})

//CRUD - Create, Read, Update, Deletd (Destroy)
//POST(CREATING), GET (READ), PUT(UPDATE), DELETE(DELETE)
// This is to read method for hubs
server.get(`/hubs`, (req, res) => {
    db.find()
    //Callback function
        .then(hubs => {
            res.status(200).json(hubs);
        })


        .catch(err => {
            res.status(500).json({
                message: err,
                succes: false
            });
            
        });
});

//post handler ( Create a hub - after - go to PostMan)

server.post(`/hubs`, (req,res) => {
    const hubInfo = req.body;
console.log(`body:`, hubInfo);

    db.add(hubInfo)
        .then((hub) => {
            res.status(201).json({success:true, hub})
        })
        .catch((err) => {
            res.status(500).json({success:false, err});
        });
});

//Delete a hub
server.delete(`/hubs/:id`, (req, res) => {
    const {id} = req.params;
//Promise
    db.remove(id)
        .then(deletedHub => {
            if(deletedHub) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: `I could not find id=${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        });
});

//UPDATE
server.put(`/hubs/:id`, (req, res) => {
    const id = req.params.id;
    const hubInfo = req.body;

    db.update(id, hubInfo)
        .then(hub => {
            if (hub) {
                res.status(200).json({success:true, hub});
            } else {
                res.status(404).json({success:false, message: `id${id} does not exist`});
            }
        })
        .catch(err => {
            res.status(500).json({success:false, err});
        });
});

server.get(`/hubs/:id` , (req, res) => {
    //do your thing here
});

// console.log (`Hello World`);

