const router = require('express').Router();
const db = require('../../models');

// get all users ---> get
router.get('/', (req, res) => {
    
    db.User.find({}).then(users => {
        res.json(users);
      });
  

});

// Create users ---> Post

router.post('/',({body},res)=>{

    const user = new db.User(body);

    db.User.create(user).then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });

});


// update  user --> Put

router.put('/:id',({ params, body }, res) => {

    db.User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUser=>{

        if (!dbUser) {
            res.json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUser);

    })
    .catch(err => {
        res.json(err);
    });

});


// delete  user --> delete

router.delete('/:id',({params}, res) => {
    db.User.findOneAndDelete({ _id: params.id })
    .then(dbUser=>{

        if (!dbUser) {
            res.json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUser);

    })
    .catch(err => {
        res.json(err);
    });

});




module.exports = router;