
class Categories{
  constructor(arrayQuestions, level){
    let questions = arrayQuestions.filter( question => question.nivel == level)
    this.questions = questions
  }
}

class Player{
  constructor(name){
    this.points = 0
    this.name = name
  }
}

// FUNCIONES DEL JUEGO
class Juego{
  constructor(){
    this.inicializador = this.inicializador.bind(this)
    this.points = [100,150,200,250,300 ]

    this.levels = 5
    pointsCounter.innerText = 0
  }

  inicializador(){
    this.elegirRespuesta = this.elegirRespuesta.bind(this)
    this.questions = data
    this.category = 1
    this.siguienteNivel()
  }

  EscribirUsuario(name){
    this.Users = dataUsers
    this.User = new Player(name)
    this.UserPoints = this.User.points
    pointsCounter.innerText = this.UserPoints
  }

  siguienteNivel(){
    let ObjectCategory = new Categories(this.questions,this.category)
    this.elegirPregunta(ObjectCategory)
  }

  elegirPregunta(preguntas){
    let randomNumber = Math.floor(Math.random() * (preguntas.questions.length - 1));
    let element = preguntas.questions[(randomNumber)]
    this.options = element.opciones
    this.question = element.pregunta
    this.answer = element.respuesta
    this.mostrarPregunta()
  }

  mostrarPregunta(){
    const numbers = [ 0, 1, 2, 3]
    let randomOptions = numbers.sort(()=>Math.random() - 0.5)
    let desorderQuestions = []

    for (let i of randomOptions){
      desorderQuestions.push(this.options[i])
    }

    questionBox.innerHTML = `<p>${this.question}</p>`

    Array.from(AnswerOptions).forEach( a => {
      let e = desorderQuestions.pop()
      a.innerHTML = `<p>${e}</p>`
    })
    
    this.agregarEventos()
  }

  agregarEventos(){
    Array.from(AnswerOptions).forEach( a =>{
      a.classList.add('activate')
      a.addEventListener('click', this.elegirRespuesta)
    })
  }

  elegirRespuesta(ev){
    let userAnswer = ev.target.innerText
    if (userAnswer == this.answer){
      if (this.category <= this.levels){
        this.sumarPuntos(this.category)
        this.category++
        if (this.category === (this.levels + 1)){
          this.ganaste()
        }else{
          this.siguienteNivel()
        }
      }
    }else{
      this.perdiste()
    }
  }

  sumarPuntos(p){
    this.UserPoints = this.UserPoints + this.points[(p - 1)]
    pointsCounter.innerText = this.UserPoints
    this.User.points = this.UserPoints
  }
  
  ganaste(){
    // cambiar el diseño 
    modalSection.classList.add('activate')
    modalTitle.innerText = `Felicitaciones!!! ${this.User.name} `
    modalPoints.innerText = `Ganaste`
    modalCounter.innerText = `${this.UserPoints} Puntos`
    modalMsm.innerText = `Ya puedes considerarte un/a genio/a de tu anatomía`
    watchAnswer.style.display = 'none'
    this.agregarUsuario()
  }
  perdiste(){
    this.User.points = 0
    this.UserPoints = this.User.points

    modalSection.classList.add('activate')
    modalTitle.innerText = `Lo sentimos! ${this.User.name} `
    modalPoints.innerText = `Perdiste tus puntos`
    modalCounter.innerText = `${this.UserPoints}`
    modalMsm.innerText = `Recuerda que puedes volver a jugar y aprender`
    watchAnswer.style.display = 'none'

    this.agregarUsuario()
  }

  agregarUsuario(){
    this.Users.push(this.User)
    localStorage.setItem('usuarios', JSON.stringify(this.Users))
  }

  rendicion(){
    modalCounter.innerText = this.UserPoints
    this.agregarUsuario()
  }

  verRespuesta(){
    this.watchAnswer = Array.from(AnswerOptions).filter( a => a.innerText == this.answer)
    this.eliminarEventos()
    return this.watchAnswer
  }

  eliminarEventos(){
    Array.from(AnswerOptions).forEach( a =>{
      a.classList.remove('activate')
      a.removeEventListener('click', this.elegirRespuesta)
    })
  }

  reiniciar(){
    if (this.watchAnswer != null){
      this.watchAnswer[0].classList.remove('chosen')
    }
    this.EscribirUsuario()
    this.eliminarEventos()
  }
}