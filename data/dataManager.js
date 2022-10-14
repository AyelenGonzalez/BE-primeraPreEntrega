import * as fs from "fs"

class DataManager{
    constructor(name){
        this.name = __dirname + "/db/" + name + ".json"
    }
}
export default DataManager