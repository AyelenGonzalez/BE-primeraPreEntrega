class Cart{
    constructor(products){
        this.timestamp = new Date().toLocaleString()
        this.products = products || []
    }
}
export default Cart