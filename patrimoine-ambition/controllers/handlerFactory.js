const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const data = await Model.findOneAndDelete({slug: req.params.slug});

        if (!data) {
            return next(new AppError('No document found with that slug', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });

exports.deleteOneById = Model =>
    catchAsync(async (req, res, next) => {

        const data = await Model.findOneAndDelete({_id: req.params.id});

        if (!data) {
            return next(new AppError('No document found with that ID/slug', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        // 2) Filtered out unwanted fields names that are not allowed to be updated
        let filteredBody = req.body;
        if (Model === 'Service') {
            filteredBody = filterObj(req.body, 'title', 'description');
        } else if (Model === 'Employee') {
            filteredBody = filterObj(req.body, 'name', 'email', 'jobTitle', 'status', 'description');
        }
        if (req.file) filteredBody.image = req.file.filename;
        const data = await Model.findOneAndUpdate({slug: req.params.slug}, filteredBody, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return next(new AppError('No data found with that Slug', 404));
        }
        await data.save({validateBeforeSave: false});

        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    });

exports.updateOneById = Model =>
    catchAsync(async (req, res, next) => {
        // 2) Filtered out unwanted fields names that are not allowed to be updated
        let filteredBody = req.body;
        if (Model === 'Partner') {
            filteredBody = filterObj(req.body, 'name', 'link');
        }
        if (req.file) filteredBody.image = req.file.filename;
        const data = await Model.findOneAndUpdate({_id: req.params.id}, filteredBody, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return next(new AppError('No data found with that Id', 404));
        }
        await data.save({validateBeforeSave: false});

        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    });

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        let filteredBody = req.body;
        if (Model === 'Service') {
            filteredBody = filterObj(req.body, 'title', 'description');
        }
        else if (Model === 'Employee') {
            filteredBody = filterObj(req.body, 'name', 'jobTitle', 'email', 'description', 'status');
        }
        else if (Model === 'Partner') {
            filteredBody = filterObj(req.body, 'name', 'link');
        }
        if (req.file) filteredBody.image = req.file.filename;
        const data = await Model.create(filteredBody);

        res.status(201).json({
            status: 'success',
            data: {
                data
            }
        });
    });

exports.getOneById = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        //let query = Model.findById(req.user.id);
        let query = Model.findById({_id: req.params.id});
        if (popOptions) query = query.populate(popOptions);
        const data = await query;
        if (!data) {
            return next(new AppError('No document found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    });

exports.getOneBySlug = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findOne({slug: req.params.slug});
        if (popOptions) query = query.populate(popOptions);
        const data = await query;

        if (!data) {
            return next(new AppError('No document found with that Slug', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    });


exports.getAll = Model =>
    catchAsync(async (req, res, next) => {

        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        // const doc = await features.query.explain();
        const data = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: data.length,
            data: {
                data
            }

        });
    });
