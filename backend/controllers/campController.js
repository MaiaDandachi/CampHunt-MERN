import asyncHandler from 'express-async-handler';
import Camp from '../models/campModel.js';

//@desc Fetch all camps
//@route GET /api/camps
//@access public
const getCamps = asyncHandler(async (req, res) => {
  let { camp, country, city, minPrice, maxPrice } = req.query;

  let conditions = {};

  if (camp) {
    // search for camp even with using 1 letter.
    conditions.name = {
      $regex: camp.trim(),
      $options: 'i',
    };
  }
  if (country) {
    conditions.country = country;
  }
  if (city) {
    conditions.city = city;
  }
  if (minPrice && maxPrice) {
    conditions.$and = [
      { price: { $gte: minPrice } },
      { price: { $lte: maxPrice } },
    ];
  } else if (minPrice && !maxPrice) {
    conditions.price = { $gte: minPrice };
  } else if (maxPrice) {
    conditions.price = { $lte: maxPrice };
  }

  const camps = await Camp.find(conditions);
  if (!camps.length) {
    res.status(404);
    throw new Error('No camps found for your filter');
  } else {
    res.json(camps);
  }
});

//@desc Fetch single camp by id
//@route GET /api/camps/:id
//@access public
const getCampById = asyncHandler(async (req, res) => {
  const camp = await Camp.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (camp) {
    res.json(camp);
  } else {
    res.status(404).json({ message: 'Camp not found!' });
  }
});

// @desc:    Create a camp
// @route    Post /api/camps
// @access   Private
const createCamp = asyncHandler(async (req, res) => {
  const { name, price, description, image, country, city } = req.body;

  const camp = new Camp({
    name: name,
    price: price,
    user: req.user._id,
    image: image,
    country: country,
    city: city,
    rating: 0,
    numReviews: 0,
    description: description,
  });

  const createdCamp = await camp.save();
  res.status(201).json(createdCamp);
});

// @desc:    Add a review
// @route    Post /api/camps/:id/reviews
// @access   Public
const createCampReview = asyncHandler(async (req, res) => {
  const { rating, comment, name } = req.body;

  const camp = await Camp.findById(req.params.id);

  if (camp) {
    const alreadyReviewed = camp.reviews.find((r) => name === r.name);

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You already reviewed this camp');
    }

    const review = {
      name: name,
      rating: Number(rating),
      comment,
    };
    camp.reviews.push(review);

    camp.numReviews = camp.reviews.length;

    camp.rating =
      camp.reviews.reduce((acc, item) => item.rating + acc, 0) /
      camp.reviews.length;

    await camp.save();
    res.status(201).json({ message: 'Review Added' });
  } else {
    res.status(404);
    throw new Error('Camp not found');
  }
});

// @desc        Delete a camp
// @route       DELETE /api/camps/:id
// @access      Private
const deleteCamp = asyncHandler(async (req, res) => {
  const camp = await Camp.findById(req.params.id);
  if (camp) {
    if (req.user._id.toString() !== camp.user.toString()) {
      res.status(401);
      throw new Error('logged in user is not the camp owner.');
    } else {
      await camp.remove();
      res.json({ message: 'Camp removed' });
    }
  } else {
    res.status(404);
    throw new Error('Camp not found');
  }
});

// @desc        Update a camp
// @route       PUT /api/camps/:id
// @access      Private
const updateCamp = asyncHandler(async (req, res) => {
  const { name, price, description, country, city, image } = req.body;

  const camp = await Camp.findById(req.params.id);

  if (camp) {
    if (req.user._id.toString() !== camp.user.toString()) {
      res.status(401);
      throw new Error('logged in user is not the camp owner.');
    } else {
      camp.name = name;
      camp.price = price;
      camp.description = description;
      camp.country = country;
      camp.city = city;
      camp.image = image;

      const updateCamp = await camp.save();

      res.json(updateCamp);
    }
  } else {
    res.status(404);
    throw new Error('Camp not found');
  }
});

export {
  getCamps,
  getCampById,
  createCamp,
  createCampReview,
  deleteCamp,
  updateCamp,
};
