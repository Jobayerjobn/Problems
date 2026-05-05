export const customLoggerMiddle = (req, res, next) => {
    const start = new Date();

    res.on('finish', () => {
        const duration = new Date() - start;

        console.log({
            method: req.method,
            Url: req.originalUrl,
            status: req.statusCode,
            duration:`${duration}ms`,
            time: new Date().toLocaleDateString(), //read for man 
            TimeStamp: new Date().toISOString(), //store for database

        });
        
    });

    next();
};

