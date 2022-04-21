const Camp = require("../models/Camp.js");
//const vacCenter = require("../models/VacCenter");
//@desc Get all Camps
//@route GET /api/v1/Campss
//@access Publice

exports.getCamps = async (req, res, next) => {
      console.log(req.query);
      let query;

      //Copy req.query
      const reqQuery={...req.query};

      //Fields to exclude
      const removeFields= ['select','sort','page','limit'];

      //Loop over remove fields and delte them from reqQuery
      removeFields.forEach(param=>delete reqQuery[param]);
      console.log(reqQuery);

      let queryStr = JSON.stringify(reqQuery);
      queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);
      query = Camp.find(JSON.parse(queryStr)).populate('reservations');

      //Select Fields
      if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
      }

      //Sort
      if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      }else{
        query=query.sort('-createdAt');
      }
      //Pagination limit page
      const page= parseInt(req.query.page,10) || 1;
      const limit= parseInt(req.query.limit,10) || 25;
      const startIndex = (page-1)*limit;
      const endIndex = page*limit;
      
  try {
    const total = await Camp.countDocuments();
      query = query.skip(startIndex).limit(limit);
      //execute query
    const camps = await query;
    //Pagination result
    const pagination={};

    if(endIndex<total){
      pagination.next={
        page:page+1,
        limit
      }
    }

    if(startIndex>0){
      pagination.prev={
        page:page-1,
        limit
      }
    }
    res
      .status(200)
      .json({ success: true, count: camps.length, data: camps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
//@desc Get single Camps
//@route GET /api/v1/Camps/:id
//@access Public

exports.getCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id).populate("reservations");
    if (!camp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: camp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, msg: `Get Camp ${req.params.id}` });
};
//@desc Create a Camps
//@route  /api/v1/Camps

exports.createCamp = async (req, res, next) => {
  console.log(req.body);
  const camp = await Camp.create(req.body);
  res.status(200).json({ success: true, data: camp });
  
};
//@desc put single Camps
//@route GET /api/v1/Camps
//@access Publice

exports.updateCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!camp) {
      return res.status(400).json({ success: false });
    }
    res
      .status(200)
      .json({
        success: true,
        msg: `Update Camp ${req.params.id}`,
        data: camp,
      });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc delete single Camps
//@route GET /api/v1/Camps
//@access Pivate

exports.deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndDelete(req.params.id);
    if (!camp) {
      return res.status(404).json({ success: false ,message:`Camp not found with id of ${req.params.id}`});
    }
    camp.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};