var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
var router = express.Router();
var port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/todo');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Item = require('./models/item.js');

router.get('/', function (request, response) {
    // TODO: add db connection check
    response.send({status:"success"});
})

router.route('/items')
    .get((request, response) => {
        Item.find((error, items) => {
            if (error) {
                response.send(error);
            } else {
                response.json(items);
            }
        });
    })
    .post((request, response) => {
        var item = new Item();

        item.done = false;
        item.content = request.body.content;

        item.save((error) => {
            if (error) {
                response.send(error);
            } else {
                response.json(item);
            }
        });
    });

router.route('/items/:item_id')
    .get((request, response) => {
        Item.find({_id: request.params.item_id}, (error, item) => {
            if (error) {
                response.send(error);
            } else {
                response.json(item);
            }
        });
    })
    .put((request, response) => {
        Item.update({_id: request.params.item_id},
            {content: request.body.content,
                 done: request.body.done},
                 (error, item) => {
                    if (error) {
                        response.send(error);
                    } else {
                        response.json({status: "success", message: "item updated"});
                    }
        });
    })
    .delete((request, response) => {
        Item.remove({_id: request.params.item_id}, (error, item) => {
            if (error) {
                response.send(error);
            } else {
                response.json({status: "success", message: "item removed"});
            }
        });
    })

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
