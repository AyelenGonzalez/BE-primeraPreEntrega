class Product{
    constructor(name, description, code, image, price, stock){
        this.timestamp = new Date().toLocaleString()
        this.name = name || ""
        this.description = description || ""
        this.code = code || ""
        this.image = image || ""
        this.price = price || ""
        this.stock = stock || ""
    }
}
export default Product