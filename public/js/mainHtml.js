//import * as cr from '../connection.js'
const socket = io.connect()


socket.on("mensajes", function (data){
    console.log(data)
    render(data)
})

function render(data) {
    var html = data
      .map(function (elem, index) {
        return (`<div>
                  <span>
                   <strong style= "color: Red">${elem.id}</strong>~
                   <em style= "color: blue">"${elem.alias}"</em>:
                   <em style= "color: green">${elem.text}
                  </span>
                </div>`)
      })
      .join(" ")
  
    document.getElementById("historialMensajes").innerHTML = html
  }
  
  function addMensaje(e) {
    let mensaje = {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
      text: document.getElementById("text").value,
    }
  
    socket.emit("nuevoMensaje", mensaje);
    document.getElementById('text').value = " "

    return false

  }
  
   