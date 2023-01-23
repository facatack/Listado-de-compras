//pantallas y botones
let pantallaInicial = document.getElementById('pantallaInicial')
let pantallaDeSelección = document.getElementById('pantallaDeSelección')
let BtnInicio = document.getElementById('BtnInicio')
let verLista = document.getElementById('verLista')
let listado = document.getElementById('listado')
let contenedor = document.getElementById('contenedor')


//array para memomria del navegador
let guardarEnStorage = []

//boton para pasar de pantalla vacia a pantalla de agregar compras
    BtnInicio.addEventListener('click', function(){
        pantallaInicial.style.display='none'
        pantallaDeSelección.style.display='flex'
    })



//  creo una clase que va a recibir los parametros de los imputs y tambien de lo guardado en la memoria local para crear los productos en dom a través de la funcion crear que será llamada al crearse cada producto tanto desde la memoria como desde los imputs.

class Producto {
    constructor(titulo, descripción, clasificacion,idProducto) {
        this.titulo = titulo
        this.descripción = descripción
        this.clasificacion = clasificacion
        this.idProducto = idProducto
    }
        crear() {
            let newProducto = `<li class="newProducto" id="${this.idProducto}"><img class="newProducto-img" alt="icono de producto" src="${this.clasificacion}"><h4 class="newProducto-h4">${this.titulo}</h4><p class="newProducto-p">${this.descripción}</p><button data-titulo="${this.titulo}" data-img="${this.clasificacion}" data-descripcion="${this.descripción}" class="newProducto-btn" id="${this.idProducto}">detalle</button><img class="newProducto-img_tacho" tacho="${this.idProducto}" alt="icono para eliminar producto del listado" src="Images/basura.png"></li>`

            contenedor.innerHTML += newProducto
        }
    }

    
//variable que toma lo guardado en local storage y lo pasa por la funcion de JSON.parse() para pdoer convertir el string guardado nuevamente en el array con sus objetos de cada producto. 
let agarroStorage = JSON.parse(localStorage.getItem("productos"))
//condicional que establece de haber algo guardado se cree y se muestre ya la lista con los productos a partir de los objetos guardados en el array. 
let cantidadDeProductos = agarroStorage.length
    // variable i que va  utilizarse para el id de los productos 
let i = cantidadDeProductos

if(cantidadDeProductos == 0){
    console.log('no hay nada en el array')} 
    else{
        let u = 0
        while( u < cantidadDeProductos){
            guardarEnStorage.push(agarroStorage[u])
            let tituloguardado = agarroStorage[u].titulo
            let descripciónGuardada = agarroStorage[u].descripción
            let clasificacionGuardada = agarroStorage[u].clasificacion
            let idProductoGuardada = u
            let productoGuardado = new Producto (tituloguardado, descripciónGuardada, clasificacionGuardada, idProductoGuardada)
            productoGuardado.crear()
            // esta incremento del u es fundamental para que no se repitan los id 
        u++
        }
        i = u 
        console.log(agarroStorage)
        pantallaInicial.style.display = 'none'
        listado.style.display = 'flex'
        verLista.style.display = 'block'
    }


    // recordemos que i empieza en 0 mas arriba, mientras i valgo menos que la cantidad de objetos guardados en el array del localstorage, se volvera a guardar cada objeto nuevamente en el array para que si creamos nuevos productos la variable i no nos pise con los nuevos productos lso que ya tenemso en caso de querer seguri teniendolos.
    
//boton que permite ver los anotados sin teener que agregar ningun otro producto.
verLista.addEventListener('click',()=>{
    pantallaDeSelección.style.display='none'
    listado.style.display='flex'
})

let idProducto 
function contador(){
    if(cantidadDeProductos) {
        idProducto = cantidadDeProductos} else {
        idProducto = i } 
}
//trabajo el agregado de producto, se crea con una condicion de dos campos llenos, en caso de que no se llenen los dos campos saltara un mensaje pidiendolo y no se creara el producto. Además se iran guardando en el array de la memoria local cada producto a traves del JSON.stringfy para convertir el string object en un string de todo el objeto.. Además una vez creado el producto se le da display block al boton que eprmitira vovler a ver la lista sin necesidad de agregar otro producto. 
let formulario = document.getElementById('form')
let mensaje = `<h3>Ingresá el producto y asignale una categoria</h3>`
let reset = document.getElementById('resetear')
let btnAgregar = document.getElementById('btnAgregar')
    btnAgregar.addEventListener('click',  function(event){
        event.preventDefault()
        let tituloProducto = document.getElementById('input').value
        let descripción = document.getElementById('textarea').value
        let clasificacion = document.getElementById('select').value
        contador()
        if(tituloProducto != '' && clasificacion !=0){
            let producto = new Producto (tituloProducto, descripción, clasificacion, idProducto)
            producto.crear()
            guardarEnStorage.push(producto)
            localStorage.setItem("productos", JSON.stringify(guardarEnStorage))
            console.log(producto)
            console.log(guardarEnStorage)
            pantallaDeSelección.style.display = 'none'
            listado.style.display = 'flex'
            i++
            idProducto++
            reset.reset()
            verLista.style.display = 'block'
        } else {
            formulario.innerHTML = mensaje
    }
    })

// este es otro boton para volver a la pantalla de agregar un producto.
    let BtnListado = document.getElementById('BtnListado').addEventListener('click',function(){
        listado.style.display='none'
        pantallaDeSelección.style.display='flex'
    })


    let pantallaDescripción = document.getElementById('pantallaDescripción')
    let contenedorDesc = document.getElementById('contenedorDesc')
    

    
    //armo el boton que va a captar el evento de cada target para poder mostrar el detalle correspondiente a traves de la escucha de un evento que captura los atributos correspondientes. En caso de que se haga click en el icono de eliminar...
    
    let agarroHijo = document.querySelector(".newProducto")
    listado.addEventListener('click', function(e){
        if(e.target.getAttribute('data-titulo')) {
            let tituloDesc = e.target.getAttribute('data-titulo')
            let imgDesc = e.target.getAttribute('data-img')
            let descripcionProducto = e.target.getAttribute('data-descripcion')
            verDetalle (tituloDesc, imgDesc, descripcionProducto)
    } else if (e.target.getAttribute('tacho')){
        let tacho = e.target.getAttribute('tacho')
        let añadido = contenedor.children
        if(tacho == 0){
            contenedor.removeChild(añadido[tacho])
            guardarEnStorage.shift()
            localStorage.setItem("productos", JSON.stringify(guardarEnStorage))
        } else {
            contenedor.removeChild(añadido[tacho])
            guardarEnStorage.splice(tacho,1)
            localStorage.setItem("productos", JSON.stringify(guardarEnStorage))
        }
    }
    })



//aca creamos el detalle en dom. esta funcion se llamo en el listener de arriba. 
    function verDetalle (tituloDesc, imgDesc, descripcionProducto){
        let mostraDetalle = `<li class="li-descripcion">
        <div class="div-img-h2-descripcion">
        <img class="img-descripcion" src="${imgDesc}">
        <h2 class="h2-descripcion">${tituloDesc}</h2>
        </div>
        <p class="p-descripcion">${descripcionProducto}</p>
        <button data-volver="btnVolver" class="volverButton">volver</button>
        </li>`
        contenedorDesc.innerHTML = mostraDetalle
        listado.style.display='none'
        pantallaDescripción.style.display='flex'
    }

    //boton para volver de la pantalla de descripcion.
    contenedorDesc.addEventListener('click', function(e){
        if(e.target.getAttribute('data-volver')){
            listado.style.display='flex'
        pantallaDescripción.style.display='none'
        }
    })

