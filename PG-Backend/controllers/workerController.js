const express = require("express");
const AppError = require("./../utils/appError");

const Worker = require("./../models/workerModel.js");
const Pg = require("../models/pgmodel");

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "This route is not for updating password. Please use /updatePassword",
          400
        )
      );

    let updates = filterObj(req.body, [
      "name",
      "role",
      "about",
      "phone",
      "address",
    ]);
    updates.updated = Date.now();
    const user = await Worker.findByIdAndUpdate(req.params.id, updates, {
      runValidators: true,
      new: true,
    });

    if (!user) return next(new AppError("No document found with that id", 404));

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) return next(new AppError("No document found with that id", 404));
    const pgs = await Pg.find({ pgOwner: req.params.id });
    req.pgs = pgs;
    next();
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     user,
    //     pgs,
    //   },
    // });
  } catch (err) {
    next(err);
  }
};

//  ADMIN USE -------------------------------------------------------------------------------------------------------------------------

exports.getAllWorkers = async (req, res, next) => {
  try {
    const users = await Worker.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createWorker = async (req, res, next) => {
  try {
    const newUser = await Worker.create(req.body);
    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getWorkerById = async (req, res, next) => {
  try {
    const user = await Worker.findById(req.params.id);
    if (!user) return next(new AppError("No document found with that id", 404));
    let response = {
      status: "success",
      data: { user },
    };
    // if (req.pgs) {
    //   response.data.pgs = req.pgs;
    // }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.updateWorkerById = async (req, res, next) => {
    try {
      req.body.updated = Date.now();
      const user = await Worker.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
  
      if (!user) return next(new AppError("No document found with that id", 404));
  
      res.status(200).json({
        status: "success",
        data: {
          user: user,
        },
      });
    } catch (err) {
      next(err);
    }
  };

exports.deleteWorkerById = async (req, res, next) => {
  try {
    const user = await Worker.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError("No document found with that id", 404));

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
