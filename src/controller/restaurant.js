import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';
import MichelinStars from '../model/michelinStars';

import { authenticate } from '../middleware/authmiddleware'

export default({ config, db })  => {
  let api = Router();

  api.post('/add', authenticate, (req, res) => {
    let newRestaurant = new Restaurant;
    newRestaurant.name = req.body.name;

    newRestaurant.save(err => {
      if (err)
        res.send(err);
      res.json({ message: `Restaurant ${newRestaurant.name} created successfully` })
    })
  });

  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err)
        res.send(err);
      res.json(restaurants);
    })
  });
  api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err)
        res.send(err);
      res.json(restaurant);
    })
  });
  api.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err)
        res.send(err);
      const oldName = restaurant.name;
      restaurant.name = req.body.name;
      restaurant.save(err => {
        if (err)
          res.send(err);
        res.json({'message': `Restaurant [${oldName}] is now [${restaurant.name}]`});
      });
    })
  });
  api.delete('/:id', (req, res) => {
    Restaurant.remove({
      '_id': req.params.id
    }, err => {
      if (err)
        res.send(err);
      res.json({'message': `Restaurant is deleted`});
    });
  });

  api.post('/:id/michelinStars/add', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if (err)
        res.send(err);
      let newMichelinStars = new MichelinStars;

      newMichelinStars.count = req.body.count;
      newMichelinStars.text = req.body.text;
      newMichelinStars.restaurant = restaurant._id;
      newMichelinStars.save((err) => {
        if (err)
          res.send(err);
        restaurant.michelinStars = newMichelinStars;
        restaurant.save(err => {
          if (err) {
            res.send(err);
          }
          res.json(`Michelin Stars count of ${ newMichelinStars.count } was successfully added to ${ restaurant.name }`);
        })
      })
    })
  });

  api.get('/:id/michelinStars', (req, res) => {
    MichelinStars.find({'restaurant': req.params.id}, (err, michelinStars) => {
      if (err)
        res.send(err);
      res.json(michelinStars);
    })
  });

  return api;
}