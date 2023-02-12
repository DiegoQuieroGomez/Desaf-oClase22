

let btnIngresar = document.getElementById('btnLogin')
let diag = document.getElementById('logDialog')
let btnIngresarUsuario = document.getElementById('ingresarUsuario')

btnIngresar.addEventListener('click', ()=>{
  console.log('funciona')
  diag.showModal()
})

btnIngresarUsuario.addEventListener('click', ()=>{
    let usuario = document.getElementById('usuario').value
    let contenedorUser = document.getElementById('divUserContainer')

    contenedorUser.innerHTML =`
    <h1> Bienvenido ${usuario}</h1>
    <button type="button" class ="btn" id="btnDeslog">Deslog</button>
    `
    contenedorUser.removeAttribute("hidden")
    btnIngresar.style.display = 'none'

    
})



function deslog(){
    //let btnDeslogeo = document.querySelector('#btnDeslog')
    Swal.fire({
        title: 'Estas seguro que deseas salir?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Hasta Pronto')
          contenedorUser.innerHTML = " "
        }
      })
    
    
}
