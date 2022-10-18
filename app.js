/* Logica de la pagina principal
Paso 1: cargar todo el HTML estatico
Paso 2: cargar los scripts (script app.js y modal) 
    * vamos a crear el contenido dinamico del catalogo de productos (sangria-identado)
    * Pregunto si hay contendio del local Storage del carrito, si lo hay, lo cargo del carrito
    * vamos a crear las funciones del carrito: agregar producto, eliminar producto, actualizar carrito
    * vaciar carrito
    * guardar en el local Storage el contenido del carrito
*/

//Definimos las variables principales
const contenedorProductos = document.getElementById('contenedor-productos')
let carrito = []

// Pregunto si hay contendio del local Storage del carrito, si lo hay, lo cargo del carrito. Lo hacemos con el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        ActulizarCarrito();
    } 
})
//llenar el contenedor de productos con cada producto del catalogo del stock.js
//---------------

stockProductos.forEach((producto) => {
    //1.    crear un div y pegarle la clase css 
    //2.    crear el contenido del div, toda la info de cada producto 
    //3.    anidar el nuevo elemento al contenedor de productos 
    //4.    crear el boton de cada producto 
    //5.    generar el evento click al boton creado y asociarlo a la funcion agregar carrito   
    // ---------------------------------------------------------------------------------------------------------- 
    const div = document.createElement('div');
    div.classList.add('producto');
    div.insertAdjacentHTML("beforeend", "<img src=" + producto.img + ">");
    div.insertAdjacentHTML("beforeend", "<h3>" + producto.nombre + "</h3>");
    div.insertAdjacentHTML("beforeend", "<p>" + producto.desc + "</p>");
    div.insertAdjacentHTML("beforeend", "<p class='precioProducto'>Precio: $" + producto.precio + "</p>");
    div.insertAdjacentHTML("beforeend", "<button id=agregar" + producto.id + " class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>");
    contenedorProductos.appendChild(div);
    const boton = document.getElementById("agregar" + producto.id);
    boton.addEventListener('click', () => {
        AgregarCarrito(producto.id)

    });
});
//crear funcion
const AgregarCarrito = (prodid) => {
    const existe = carrito.some(prod => prod.id === prodid) //buscar elemento por id
    // alert(existe)
    ///se pregunta si existe el producto en nuestro carrito para cuando exista solo se modifica la cantidad del producto.
    //condicionales implicitas
    //voy a modidficar todo el carrito con un solo elemento, se hace con un .map
    if (existe) { //si existe en el carrito
        carrito.map(prod => { //el map me esta haciendo un nuevo arreglo de carrito para poder trabajar sobre el y actualizar el original.
            if (prod.id === prodid) {
                prod.cantidad++ //me incrementa la cantidad del producto cuando ya existe el producto en mi carrito.
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodid); 
        carrito.push(item); 
        
    }
    console.log(carrito)

  //llama a la funcion actualizar carrito
  ActulizarCarrito() 
}

const ActulizarCarrito= () => {
    //limpiar el contenedor antes de actualizarlo
    //recorrer el arreglo carrrtio
    //  -crear el HTML o los objetos de cada producto
    //  -anidar el elemento creado(HTML) al contenedor carrrito
    //  -actualizar la cantidad del carrito
    // -actualizar el precio total del carrito
    // -guardar en el local storage el contenido del carrito

    const contadorCarrito=document.getElementById('contadorCarrito')
    contadorCarrito.innerText=carrito.length   //cambioandole el valor que esta dentro
    const contenedorCarrito=document.getElementById('carrito-contenedor')
    const precioTotal=carrito.reduce((acc,prod)=>acc+prod.cantidad*prod.precio,0)
    contenedorCarrito.innerHTML='' //estamos limpiando todo el contenido
    carrito.forEach((producto)=>{
        const div=document.createElement('div')
        div.classList.add('productoEnCarrrito')
        div.insertAdjacentHTML("beforeend", "<p>" + producto.nombre + "</p>");
        div.insertAdjacentHTML("beforeend", "<p> " + producto.cantidad + "</p>" );
        div.insertAdjacentHTML("beforeend","<p class='precioProducto'>Precio: $" + producto.precio +"</p>");
        div.insertAdjacentHTML("beforeend", "<button onclick='eliminarDelCarrito(" + producto.id + ")' class='boton-eliminar'><i class='fas fa-trash-alt'></i></button>");
        contenedorCarrito.appendChild(div)
    })
    const div2=document.createElement('div')
    div2.insertAdjacentHTML("beforeend","<p class='precioProducto'>PrecioTotal: $" + precioTotal +"</p>");

    contenedorCarrito.appendChild(div2)
    div2.insertAdjacentHTML("beforeend", "<button onclick='vaciarCarrito()' class='boton-vaciar'>Vaciar Carrito</button>");
//estamos serializando o parseando el carrito a string 
    localStorage.setItem('carrito',JSON.stringify(carrito))

}
/////--------------------------------
//aqui nos trae un solo valor el parametro prodId
// busco el indice del producto y lo quito del arreglo 
// Actualizo el carrito
const eliminarDelCarrito=(Id)=>{
    const item=carrito.find((elemento)=> elemento.id===Id)
    //lo que hace el find me busca el id en este caso y si lo encuentras regresame ese elemento que coincide con esa propiedad
    //el indexOf lo que hace es darle a la constante lo que trae el arreglo carrito
    const indice=carrito.indexOf(item)
    //ese (indice,1) lo que me dice es quitalo del carrito o del arreglo carrito
    //el splice va esperar un indice y el quita ese elemento por el indice que le demos en este caso es 1, el splice solo tiene el 0 y el 1
    carrito.splice(indice,1)
    ActulizarCarrito()
}

const vaciarCarrito=()=>{
    carrito.length=0;
    ActulizarCarrito()
}