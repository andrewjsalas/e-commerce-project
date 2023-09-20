
// Handles async await to eliminate having to write several try catches for every route. 
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
export default asyncHandler;