const socket = io.connect("http://localhost:8080", {forceNew: true})

socket.on("mensajes", function (data){
    console.log(data)
})

function render(data) {
    var html = data
      .map(function (elem, index) {
        return `<div>
                   <strong>${elem.correo}</strong>:
                   <em>${elem.alias}</em>
                   <em>${elem.text}
          </div>`
      })
      .join(" ")
  
    document.getElementById("mensajes").innerHTML = html
  }
  
  socket.on("mensajes", function (data) {
    render(data)
  })
  
  function addMensaje(e) {
    var mensaje = {
      id: document.getElementById("correo").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
      text: document.getElementById("text").value,
    };
  
    socket.emit("nuevoMensaje", mensaje);

    return false;
  }
  