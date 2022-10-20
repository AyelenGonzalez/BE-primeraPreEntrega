import { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

class DataManager {

  constructor(name){
    this.name = `${__dirname}/dataBase/${name}.json`     
    try {
      this.elements = fs.readFileSync(this.name, 'utf-8')
      this.elements = JSON.parse(this.elements)
    } catch (error) {
      this.elements = []
    }
  }

  getAll(){
    return this.elements
  }

  getById(id){
    try {
      let element = this.elements.filter(el => el.id == parseInt(id))
      return element
    } catch (error) {
        console.log(`Product id = ${id} not found`)
        return error
    }
  }


  add(element){
    try {
      this.elements.length == 0 ? element.id = 1 : element.id = this.elements[this.elements.length - 1].id + 1
      this.elements.push(element)
      fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
            .then(() => console.log('Saved succesful'))
            .catch(e => console.log(e))
        return ({ response: 'Saved', element })
    } catch(error) {
        console.log(error)
        return ({ response: 'Error!', error })
    }
    console.log(this.elements)
  }

	update(element){
        try {
			let ref = this.elements.find(el => el.id == element.id)
			let updatedElement = {...ref, ...element}
			let index = this.elements.findIndex(el => el.id == updatedElement.id)
			this.elements[index] = updatedElement
            fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
				.then(() => console.log('Updated succesful'))
				.catch(e => console.log(e))
			return ({ response: "Updated", element: updatedElement })
		} catch (error) {
			console.log(error)
			return ({ response: 'Error!', error })
		}
	}
    
    deleteById(id){
        try {
            let index = this.elements.findIndex(el => el.id == id)
            let element = this.elements.splice(index, 1)
            fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
            .then(() => console.log(`Element with ID ${id} deleted`))
            .catch(e => console.log(`Error. ${e}`))
            return({ response: 'Deleted', element}) 
        } catch (error) {
            console.log(error)
            return `Error! ID does not exists. ${error}`
        } 
    }
    
      deleteAll(){
          this.elements = []
        fs.truncateSync(this.name, 0, () => console.log(`${this.name} clear`))
            return({ response: 'Deleted All Data' })
        }

}
export default DataManager