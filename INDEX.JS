
const juego = new Juego


// FUNCIONES DE LOS EVENTOS
const rendirse = ()=>{
  juego.rendicion()
  modalSection.classList.add('activate')
  modalTitle.innerText = `Acabas de abandonar el juego`
  modalPoints.innerText = `Puntos Acumulados`
  modalMsm.innerText = `Que me vaya no significa que no quiera saber la respuesta`
  watchAnswer.style.display = 'block'
}

const reiniciar = ()=>{
  welcomeSection.classList.remove('disapeer')
  modalSection.classList.remove('activate')
  questionSection.classList.remove('activate')
  juego.reiniciar()
  userFormSection.classList.toggle('disapeer')
  questionButton.removeEventListener('click', reiniciar)
  questionButton.addEventListener('click', rendirse)
  questionButton.innerText = '¡Me rindo!'

}

// EVENTOS DE LOS BOTONES PRINCIPALES
startButton.addEventListener('click', ()=>{

  welcomeSection.classList.add('disapeer')
  questionSection.classList.add('activate')

  juego.inicializador()
})

questionButton.addEventListener('click', rendirse)

inputUserName.addEventListener('keyup', event =>{

  if (event.key == 'Enter' && inputUserName.value != ''){
    juego.EscribirUsuario(inputUserName.value)
    userFormSection.classList.add('disapeer')
  }

  if (event.key == 'Enter' && inputUserName.value == '') {
    inputUserName.classList.add('error');
    inputUserName.placeholder = 'Ingrese su nombre'
  }
})

watchAnswer.addEventListener('click', ()=>{
  questionButton.innerText = 'Volver a jugar'
  questionButton.removeEventListener('click', rendirse)
  questionButton.addEventListener('click', reiniciar)

  const element = juego.verRespuesta()
  element[0].classList.add('chosen')
  modalSection.classList.remove('activate')
})

closeIcon.addEventListener('click', reiniciar)