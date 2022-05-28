///menu responsive

const menu = document.getElementById('check')
const opcion = document.querySelectorAll('#menu-bar a')  

menu.addEventListener('change', () => {
   if(menu.checked){
        opcion.forEach((opcion) => {
            opcion.addEventListener('click', () => {
                menu.checked = false
            })
        })
    }else{
        console.log('no se esta detectanto el evento')
    }
})

// formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = { // Expresiones regulares
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,//Letras nuemors, guione y guion bajo
	asunto: /^[a-zA-ZÀ-ÿ\s\W]{5,25}$/, // Cualquier caractter maximo 50
	mensaje: /^[a-zA-ZÀ-ÿ\s\W]{5,200}$/ // Cualqioer caracter maximo 200
}

const campos = {
    nombre: false,
	email: false,
	asunto: false,
	mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name){
		case "nombre": 
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email": 
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "asunto": 
			validarCampo(expresiones.asunto, e.target, 'asunto');
		break;
		case "mensaje": 
            // validarTextMensaje();
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
		campos[campo] = true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
		campos[campo] = false
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
	e.preventDefault()

	const terminos = document.getElementById('terminos')
	if(campos.nombre && campos.email && campos.asunto && campos.mensaje){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
		document.getElementById('formulario__completa').classList.remove	('formulario__completa-activo')
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
		}, 5000)

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto')
		})
	}else {
		document.getElementById('formulario__completa').classList.add('formulario__completa-activo')
	}
})

// API GitHub
let div_orden = document.querySelector("div #projetos")

function aleatorio() {
    let inferior = 1
    let superior = 5
    let numPosibilidades = superior - inferior;
    let aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return ale = inferior + aleatorio;
}

function creatCardRepos (titulo, descripcion, url_repos, url_demo) {
    // Article
    let card_repos = document.createElement("article")
    card_repos.classList.add("carta", "grande")

    // Imagen
    let div_img = document.createElement("div")
    div_img.classList.add("img_card")

    function createImage() {
        let al = aleatorio()
        elem = document.createElement("img")
        elem.src = "img/" + al + ".jpg"
        elem.alt = al

        return elem
    }   

    div_img.appendChild(createImage())


   // Cuerpo del titulo
   let body_title = document.createElement('div')
   body_title.classList.add("intern")

   let titulo_repos = document.createElement('h3')
   titulo_repos.textContent = titulo
   let descripcion_repos = document.createElement('p')
   descripcion_repos.textContent = descripcion

   body_title.appendChild(titulo_repos)
   body_title.appendChild(descripcion_repos)

   //botones
   let body_btn = document.createElement('div')
   body_btn.classList.add("btn-block")

   let btn_repos = document.createElement('a')
   btn_repos.href = url_repos
   btn_repos.target = "_blank"
   btn_repos.textContent = "Repositorio"
   btn_repos.classList.add("btn")

   let btn_demo = document.createElement('a')
   btn_demo.href = url_demo
   btn_demo.target = "_blank"
   btn_demo.textContent = " Ver Demo"
   btn_demo.classList.add("btn")

   body_btn.appendChild(btn_repos)
   body_btn.appendChild(btn_demo)

   card_repos.appendChild(div_img)
   card_repos.appendChild(body_title)
   card_repos.appendChild(body_btn)


   return card_repos

}

///API 

function getApiGitHub () {
    const resp = "https://api.github.com/users/eefracotor/repos" 
    fetch(resp)
    .then(async res =>  {
        if (!res.ok) {
            throw new Error(res.status)
        }

        var data = await res.json()
        div_orden.innerHTML = ""
        data.map(item => {
            div_orden.appendChild(creatCardRepos (item.name, item.description, item.html_url, item.homepage))

        })

    })
    .catch(e => console.log(e))
}

getApiGitHub()

// class ApiConection {
    
//     get API_URL(){
//         return  "https://api.nasa.gov/planetary/apod"
//     }
//     get API_KEY() {
//         return "563492ad6f91700001000001323185bdcaa5446e8989be6655fa21b8"
//     }
 