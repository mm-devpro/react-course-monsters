const catchAsync = require('./catchAsync');
const sharp = require('sharp');
const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


exports.uploadImage = upload.single('image');

exports.resizeUserImage = catchAsync( async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename =  `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality:80 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
});


exports.resizeServiceImage = catchAsync(async (req, res, next) => {
    //console.log(req.files);

    //if (!req.files.images) return next();
    if (!req.file) return next();

    // 1) Cover image
    req.file.filename = `service-${req.params.slug}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(780, 520)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/services/${req.file.filename}`);

    next();
    // req.body.images = [];
    // await Promise.all(req.files.images.map(async (file, i) => {
    //     const filename = `service-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
    //
    //     await sharp(file.buffer)
    //         .resize(2000, 1333)
    //         .toFormat('jpeg')
    //         .jpeg({quality: 90})
    //         .toFile(`public/img/services/${filename}`);
    //
    //     req.body.images.push(filename);
    // }));
    //
    // next();
});

exports.resizePartnerImage = catchAsync(async (req, res, next) => {
    //console.log(req.files);

    //if (!req.files.images) return next();
    if (!req.file) return next();

    // 1) Cover image
    req.file.filename = `partner-${req.params.id}-${Date.now()}.png`;

    await sharp(req.file.buffer)
        .resize({
            width: 750,
            height: 200,
        })
        .toFormat('png')
        .png({quality: 90, progressive:true})
        .toFile(`public/img/partners/${req.file.filename}`);

    next();
});

exports.resizeEmployeePhoto = catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    // 1) Cover image
    req.file.filename = `employee-${req.params.slug}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(320, 205)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/employees/${req.file.filename}`);

    next();
});