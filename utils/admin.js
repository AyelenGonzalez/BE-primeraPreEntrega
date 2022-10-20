export default (req, res, next) => {
    req.admin = req.get('admin')
    next()
}