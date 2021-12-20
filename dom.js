// MANEJO DEL DOM
const startButton = document.querySelector('.start-button')
const questionButton = document.querySelector('.question-button')
const welcomeSection = document.querySelector('.welcome-section')
const questionSection = document.querySelector('.questions-section')
const questionBox= questionSection.querySelector('.question')
let pointsCounter= questionSection.querySelector('.header-counter')

let userFormSection = questionSection.querySelector('.userFormSection')
let inputUserName = userFormSection.querySelector('input')

const modalSection = document.querySelector('.modal-answer')
const closeIcon = document.querySelector('.close-icon')
let modalCounter = document.querySelector('.modal-counter')
let modalPoints = document.querySelector('.modal-points')
let modalTitle = modalSection.querySelector('.modal-title')
let modalMsm = modalSection.querySelector('.modal-msm')
let watchAnswer = document.querySelector('.modal-link')

let AnswerOptions = document.querySelectorAll('.option-item')