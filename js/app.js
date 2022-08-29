// VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');




const max = new Date().getFullYear();
const min = max - 12;

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    marca: '',
    color: ''
}


// EVENTOS

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // MUestra los automóviles al cargar la página 
    

    llenarSelect(); // Llena el select de años al cargar la página
});  

// Event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;  // Para ir llenando el objeto

    filtrarAuto();
}); 




// FUNCIONES

function mostrarAutos(autos){

    LimpiarHTML();  // Elimina el HTML previo

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $ ${precio} -  Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML)
    }) 
}


// Genera los años del select

function llenarSelect(){
    for( let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año al select 
    }
}


// LimpiarHTML

function LimpiarHTML() {
    while( resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// Función que filtra en base a la búsqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas)
    .filter(filtrarTransmision).filter(filtrarColor)

    // console.log(resultado);
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function filtrarMarca(auto) {
    if( datosBusqueda.marca != '' ){
        return auto.marca == datosBusqueda.marca;
    } 
    return auto;
}

function filtrarYear(auto) {
    if( datosBusqueda.year != '' ){
        return auto.year == parseInt(datosBusqueda.year);
    } 
    return auto;
}

function filtrarMinimo(auto) {
    if( datosBusqueda.minimo != '' ){
        return auto.precio >= datosBusqueda.minimo;
    } 
    return auto;
}

function filtrarMaximo(auto) {
    if( datosBusqueda.maximo != '' ){
        return auto.precio <= datosBusqueda.maximo;
    } 
    return auto;
}

function filtrarPuertas(auto) {
    if( datosBusqueda.puertas ){
        return auto.puertas == parseInt(datosBusqueda.puertas);
    } 
    return auto;
}

function filtrarTransmision(auto) {
    if( datosBusqueda.transmision ){
        return auto.transmision == datosBusqueda.transmision;
    } 
    return auto;    
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if( color ){
        return auto.color == color;
    } 
    return auto;    
}

function noResultado() {

    LimpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros parámetros'
    resultado.appendChild(noResultado)
}