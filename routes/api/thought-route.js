const router = require('express').Router();
const req = require('express/lib/request');
const db = require('../../models');

// get all thoughts ---> get
router.get('/', (req, res) => {
    
    db.Thought.find({}).then(ths => {
        res.json(ths);
      });
  

});

// Create thoughts ---> Post

router.post('/',({body},res)=>{

  db.Thought.create(body)
            .then(({ _id }) => {
                return db.User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found !' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    

});


// update thoughts --> Put

router.put('/:id',({ params, body }, res) => {

    db.Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(ths=>{

        if (!ths) {
            res.json({ message: 'No thoughts found !' });
            return;
          }
          res.json(ths);

    })
    .catch(err => {
        res.json(err);
    });

});


// delete  thoughts --> delete

router.delete('/:id',({params}, res) => {
    db.Thought.findOneAndDelete({ _id: params.id })
    .then(ths=>{

        if (!ths) {
            res.json({ message: 'No thoughts found !' });
            return;
          }

          res.json(ths);

    })
    .catch(err => {
        res.json(err);
    });

});


// add reaction
router.post('/:thgtId/reactions',({params,body}, res) => {

    db.Thought.findOneAndUpdate(
        { _id: params.thgtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }

    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


// Delete reaction 

router.delete('/:thgtId/reactions/:reacId',({params}, res) => {

    db.Thought.findOneAndUpdate(
        { _id: params.thgtId },
        { $pull: { reactions: { reactionId: params.reacId } } },
        { new: true }
      )
      .then(dbThoughtData => {
          res.json(dbThoughtData)
      })
      .catch(err => {
          res.json(err)
      });

});

module.exports = router;