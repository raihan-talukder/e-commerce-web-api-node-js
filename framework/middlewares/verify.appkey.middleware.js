module.exports.hasValidAppKey = (req, res, next) => {
    try {
        let appkey = req.headers['appkey'];
        if(appkey && appkey === 'Raihan'){
            next();
        }else{
            return res.status(400).json({
                HasError: true,
                Results: null,
                Message: ['Invalid App Key!'],
            });
        }
    } catch (err) {
        return res.status(400).json({
            HasError: true,
            Results: null,
            Message: ['Invalid App Key!'],
        });
    }
};
