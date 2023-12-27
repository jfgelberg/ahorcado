Vue.component('componente-uno', {
  data: function () {
    return {
      saludo: "vamos a Jugar!",
      boton: "comenzar",
    }
  },
  template: `
   <div class="screen inicio">
        <h1>{{saludo|mayus}}</h1>
        <button class="btn" id="start-btn">{{boton |uppercase}}</button>
      </div>
   `,
});

Vue.component('componente-dos', {
  data: function () {
    return {
      intro: "datos del jugador o jugadora",
      form_data: {
        nombre: "",
        apellido: "",
        email: "",
        edad: "",
      },
      datosCargados: []
    }
  },

  template: `
    <div class="screen">
    <div class="container mt-5 p-5">
        <div id="contenido" class="row">
          <div class="col-md-6 agregar-cita">
            <form v-on:submit.prevent>
              <h2 class="mb-4">{{intro |mayus}}</h2>
              <div class="form-group row">
                <label class="col-sm-4 col-lg-4 col-form-label">Nombre:</label>
                <div class="col-sm-8 col-lg-8">
                    <input type="text" v-model="form_data.nombre" class="form-control" placeholder="María" />
                </div>
              </div>
              <div class="form-group row my-3">
                <label class="col-sm-4 col-lg-4 col-form-label">Apellido:</label>
                <div class="col-sm-8 col-lg-8">
                  <input type="text" v-model="form_data.apellido" class="form-control" placeholder="Mendez" />
                </div>
              </div>
              <div class="form-group row my-3">
                <label class="col-sm-4 col-lg-4 col-form-label">E-mail:</label>
                <div class="col-sm-8 col-lg-8">
                  <input type="email" v-model="form_data.email" class="form-control" placeholder="maria@mednez.com" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-lg-4 col-form-label">Edad:</label>
                <div class="col-sm-8 col-lg-8">
                  <input type="number" v-model="form_data.edad" class="form-control" placeholder="" min="6" max="100" />
                </div>
              </div>
             
              <div class="form-group mt-3">
                <button  @click="guardar(form_data)" class="btn btn-success w-100">
                  Guardar datos
                </button>
              </div>
            
              <div class="form-group mt-4 row">
              <div class="col-sm-12 col-lg-12 d-flex justify-content-center align-items-center">
                <button id="start-btn1">PLAY
                </button>
              </div>
              </div>
            </form>
          </div>
          <div class="col-md-6">
              <legend id="administra" class="fs-3 mb-3">Datos cargados</legend>
              <div v-for="item in datosCargados" class="bg-dark p-2 rounded-1 mb-1"  style="--bs-bg-opacity: .10;">
                <ul id="citas">
                  <li>Nombre: {{item.nombre |mayus}}</li>
                  <li>Apellido: {{item.apellido |mayus}}</li>
                  <li>E-mail: {{item.email}}</li>
                  <li>Edad: {{item.edad}}</li>
                </ul>
              </div>  
              <div class="boton_borrar">
                <button  @click="borrar(form_data)" class="btn btn-success w-50 justify-content-center align-items-center mt-3">Borrar datos</button>
              </div>
            </div>
        </div><!--.row-->
      </div><!--.container-->

  </div><!--/.screen-->
   `,
  methods: {
    guardar: function (form_data) {

      if (!localStorage.dato) {
        this.datosCargados = []
      } else {
        this.datosCargados = JSON.parse(localStorage.getItem("dato"))
      }

      this.datosCargados.push(form_data)
      localStorage.setItem("dato", JSON.stringify(this.datosCargados))

    },

    borrar: function () {
      localStorage.clear(this.datosCargados); //borra todos los datos del localsotorage
      this.datosCargados = ""; //actualiza la vista para que no se vea lo cargado

    },

  },

});

Vue.component('componente-tres', {
  data: function () {
    return {
      win: false,
      lost: false,
      contador_aciertos: 0,
      contador_errores: 0,
      aleatorio: 0,
      palabra_escrita: [],
      color_botones: [],
      letras: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      frutas: ["manzana", "pera", "melon", "cereza", "ciruela", "naranja", "mandarina", "frutilla", "sandia", "durazno"],
      imagenFruta: "", 
      imagenVisible: false, 
      frutas_img: {
        "manzana": 'img/manzana.png',
        "pera": 'img/pera.png',
        "melon": 'img/melon.png',
        "cereza": 'img/cereza.png',
        "ciruela": 'img/ciruela.png',
        "naranja": 'img/naranja.png',
        "mandarina": 'img/mandarina.png',
        "frutilla": 'img/frutilla.png',
        "sandia": 'img/sandia.png',
        "durazno": 'img/durazno.png',
  
      },
      ganaste: "¡ganaste!",
      bien: "¡bravo!",
      perdiste: "perdiste. ¡Sigue intentando!",
    }
  },

  template: `
  <div class="screen game-container" id="game-container">
  <nav class="navbar rounded-2 navbar-expand-lg nav">
    <div class="container">
    <div class="row">
    <div class="col-md-12 d-flex justify-content-center align-items-center" >
    <h3 class="d-md-block">Juego del Ahorcado</h3>
        </div>
      </div>


      <div class="row m-3">
        <div class="col-md-8 d-flex" >
          <p class="d-md-block m-auto">Consigna: Encuentra las frutas escondidas</p>
        </div>
      </div>

      <div class="row mx-1">
<div class="col-md-10 d-flex mt-3" >
<span class="d-md-block" v-if="win">{{ganaste | uppercase}}</span>
      </div>
      </div>

      <div class="row">
      <div class="col-md-10 d-flex">
  <div class="imagenf" v-if="win && imagenVisible">
    <img class="imagenf" :src="imagenFruta" alt="Imagen de la fruta">
        </div>
    
  </div>
</div>

<div class="row">
<div class="col-md-10 d-flex" >
<span class="d-md-block" v-if="lost">{{perdiste | uppercase}}</span>
      </div>
      </div>

      <div class="row mx-1">
      <div class="col-md-10 d-flex">
  <div class="imagenf" v-if="lost">
  <img class="imgEstado" src="img/lose.png" />
        </div>
    
  </div>
</div>



      <div class="row" id="barraNav">
        <div class="col-12 col-md-12 col-lg-12 d-lg-flex ms-auto float-end">
          <ul class="navbar-nav ms-auto gap-2 mx-2">
            <li class="nav-item btn-barraNav">
              <label class="text-light px-2">Aciertos:</label>
              <input type="text" class="form-control text-center" v-model="contador_aciertos" />
            </li>
            <li class="nav-item" id="pagina_activa">
              <label class="text-light px-2">Errores:</label>
              <input type="text" class="form-control text-center" v-model="contador_errores" />
            </li>
            <li class="nav-item" id="pagina_activa">
              <button class="btn btn-primary" @click="generarAleatorio">NUEVO JUEGO</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>


  

  
  <div class="container">
        <div class="row">
          <div class="mt-3 contenedorAhorcado">
            
            <div class="contenedorAhorcadoImagen">
              <div id="horizontal-list centrado ">
                <img
                  class="imgAhorcado"
                  v-bind:src="'img/'+'img'+contador_errores+'.jpg'"
                  alt />
              </div>
            </div>
      
            <div class="contenedorPalabras">
              <div id="horizontal-list centrado ">
                <!-- Aca va la lista de los resultados -->
                <button
                  v-for="item in palabra_escrita"
                  type="button"
                  class="btn btn-primary text-center my-3 palabraEscrita">
                  <span class="badge cuadro">{{item}}</span>
                </button>
              </div>
            </div>
      
            <div class="contenedorTeclado">
              <div id="horizontal-list centrado teclado">
                <span
                  class="d-flex justify-content-center align-items-center flex-wrap gap-2">
                  <button
                    class="botones"
                    v-for="(letra,index) in letras"
                    v-on:click="comparar(letra,index)"
                    v-bind:key="index"
                    v-bind:disabled="botones[index]"
                    v-bind:class="{verde:color_botones[index]=='verde',rojo:color_botones[index]=='rojo'}"
                    type="button">
                    <span class="badge cuadro">{{letra}}</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="navbar  rounded-2 navbar-expand-lg pb-3">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12 col-lg-12 d-lg-flex ms-auto float-end">
          <ul class="navbar-nav ms-auto gap-2 mx-2">
          <li class="nav-item btn-barraNav">
          <!-- Aca va la lista de los resultados -->
          <!--<div :class="win ? 'text-center mt-3' : 'd-none'">
            <img class="imgEstado" src="img/win.png" />
            <span>{{ bien | uppercase }}</span>
          </div>
         <div :class="lost ? 'text-center mt-3' : 'd-none'">
            <img class="imgEstado" src="img/lose.png" />
            <span>{{ mal | uppercase }}</span>
          </div>-->
        </li>

            <!--<li><span>{{palabra_generada}}</span></li>-->
          </ul>
        </div>
      </div>
    </div>
  </div>


  
</div><!--./screen-->
  
  `,

  methods: {
    generarAleatorio: function () {
      this.game = true
      this.win = false
      this.lost = false
      this.palabra_escrita = []
      this.contador_aciertos = 0
      this.contador_errores = 0
      this.botones = []
      this.color_botones = []
      this.aleatorio = Math.floor(Math.random() * this.frutas.length)
      //	Crea un array de la misma longitud 
      for (var i = 0; i < this.frutas[this.aleatorio].length; i++) {
        this.palabra_escrita.push(' ')
      }
      return this.aleatorio
    },

    //metodo comparar - recibe 2 valores: 1- el caracter y 2- la posición de la letra seleccionada
    comparar: function (caracter, posicion) {
      if (this.game) {
        //contador
        contadorFlag = 0


        //capturamos la posición del botón
        this.botones[posicion] = true
        for (i = 0; i <= this.palabra_generada.length; i++) {

          //	Si la letra se encuentra en la palabra
          if (caracter.toLowerCase() == this.palabra_generada[i]) {

            //Cuenta los errores
            this.palabra_escrita[i] = caracter

            //contador flag - si no hubo coincidencia el flag, permanece en 0
            contadorFlag++

            //app.$set(this.palabra_escrita, i, caracter)
            this.contador_aciertos++
          }
        } 
        if(contadorFlag == 0) {
          this.contador_errores++
          this.color_botones[posicion] = 'rojo'
        }
        else
        {
          this.color_botones[posicion] = 'verde'
        }

        //saber cuando se ganó y cuando se perdió
        if(this.contador_aciertos==this.palabra_generada.length){
          this.win = true
          this.game = false
          this.mostrarImagen();
        }

        //si el contador llega a los 7 intentos, también se pierde
        if (this.contador_errores == 7) {
					this.lost = true
					this.game = false
				}
      }


      //comprobaciones de que coincide la letra y la posición
      //alert(caracter);
      //alert(posicion);
    },

    //para mostrar imagen frutas;
    mostrarImagen() {
      if (this.win) {
        if (this.palabra_generada in this.frutas_img) {
          this.imagenFruta = this.frutas_img[this.palabra_generada];
          this.imagenVisible = true;
        }
      }
    }
  
    
  },

  computed: {
    palabra_generada: function () {
      return this.frutas[this.aleatorio]
    },	//	End palabra_generada
  },

  created: function () {
    this.generarAleatorio()
  },


});

//filtros que se aplicarán a cualquier componente 

Vue.filter('mayus', function(value){
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
});

//------------------ principal - root ------------------------------
var app = new Vue({
  el: "#contenedor",
  data: {
   
  }
})
