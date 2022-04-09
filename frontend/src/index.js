/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import reactDom from "react-dom"
import { App } from './App'

const app = document.getElementById('app')
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, app,
)

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active')
  }

  function closeModal($el) {
    $el.classList.remove('is-active')
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach($modal => {
      closeModal($modal)
    })
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach($trigger => {
    const modal = $trigger.dataset.target
    const $target = document.getElementById(modal)
    console.log($target)

    $trigger.addEventListener('click', () => {
      openModal($target)
    })
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach($close => {
    const $target = $close.closest('.modal')

    $close.addEventListener('click', () => {
      closeModal($target)
    })
  })

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', event => {
    const e = event || window.event

    if (e.keyCode === 27) { // Escape key
      closeAllModals()
    }
  })
})
// const root = createRoot(app)
// root.render(
//   <React.StrictMode />,
// )
// createRoot(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   app,
// )
