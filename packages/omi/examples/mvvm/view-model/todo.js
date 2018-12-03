import mapping from 'mappingjs'
import todo from '../model/todo'

class TodoViewModel {
  constructor() {
    this.data = {
      items: []
    }
  }

  update() {
    //will automatically update the view!!!
    mapping.auto(todo, this.data)
  }

  complete(id) {
    todo.complete(id)
    this.update()
  }

  uncomplete(id) {
    todo.uncomplete(id)
    this.update()
  }

  add(text) {
    todo.add(text)
    this.update()
  }

  getAll() {
    todo.getAll(() => {
      this.update()
    })
  }
}

const vd = new TodoViewModel()

export default vd
