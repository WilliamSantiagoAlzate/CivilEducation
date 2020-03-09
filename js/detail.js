//Create dynamic tables
document.getElementById("filas").addEventListener("input", dibujarTabla)
document.getElementById("fila_de_mas").addEventListener("click", filaDeMas)
var tr, td1, td2, td3, td4, input1, input2, input3, button;
const tabla = document.getElementById("tabla");
var menos = 1;

function dibujarTabla() {
  var f = parseInt(document.getElementById("filas").value);
  var titulo = `<tr>
    <th>Posición</th>
    <th>Momento negativo</th>
    <th>Momento positivo</th>
    <th>Eliminar fila</th>
  </tr>`;
  tabla.innerHTML = titulo;

  for (var i = 0; i < f; i++) {
    filaDeMas()
  }
}

function filaDeMas() {
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td2 = document.createElement("td");
  td3 = document.createElement("td");
  td4 = document.createElement("td");
  input1 = document.createElement("input");
  input2 = document.createElement("input");
  input2.addEventListener("input", graficar);
  input3 = document.createElement("input");
  input3.addEventListener("input", graficar);
  button = document.createElement("button");
  button.setAttribute("id", "fila_de_menos_" + menos)
  button.addEventListener("click", filaDeMenos);
  button.innerHTML = "-";
  td1.appendChild(input1);
  td2.appendChild(input2);
  td3.appendChild(input3);
  td4.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tabla.appendChild(tr);
  menos++;
}


function filaDeMenos(ev) {
  var nodo = ev.target
  nodo.parentNode.parentNode.parentNode.removeChild(nodo.parentNode.parentNode);
}

//Graph steel code
var contenedor = document.getElementById("grafica").getContext("2d");
var minTicks, maxTicks, stepTicks;

var momentoNegativo = {
  label: "Momento Negativo",
  data: [],
  lineTension: 0,
  fill: false,
  backgroundColor: "#777",
  borderColor: "#777"
}

var momentoPositivo = {
  label: "Momento Positivo",
  data: [],
  lineTension: 0,
  fill: false,
  backgroundColor: "#333",
  borderColor: "#333"
}

var newData = {
  labels: [],
  datasets: [momentoNegativo, momentoPositivo]
}

var chartOptions = {
  tooltips: {
    callbacks: {
      title: function(tooltipItems, data) {
        return 'Posición: ' + tooltipItems[0].xLabel + ' m';
      },
      label: function(tooltipItems, data) {
        return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' KN/m';
      }
    }
  },
  scales: {
      xAxes: [{
        display: true,
        gridLines: {
            display:false
        },
        scaleLabel: {
          display: true,
          labelString: 'Posición (m)'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
            display:false
        },
        scaleLabel: {
          display: true,
          labelString: 'Momento (KN/m)'
        },
        ticks: {
          min: minTicks,
          max: maxTicks,
          stepSize: stepTicks
        }   
      }]
  }
}

var grafica = new Chart(contenedor, {
  //Tipo de grafica
  type: "line",
  //Insertar datos
  data: newData,
  //Insertar estilos
  options: chartOptions
});

function updateChart(nuevaInfo) {
  grafica.data.datasets.data = nuevaInfo
  grafica.update();
}

function graficar() {
  var datos = tabla.childNodes.length;
  var x, y, z;

  newData["labels"] = [];
  momentoNegativo["data"] = [];
  momentoPositivo["data"] = [];

  for (var i = 2; i < datos; i++) {
    x = parseFloat(tabla.childNodes[i].childNodes[0].childNodes[0].value);
    if (isNaN(x)) {
      x = 0;
    }
    newData["labels"].push(x)

    y = parseFloat(tabla.childNodes[i].childNodes[1].childNodes[0].value);
    if (isNaN(y)) {
      y = 0;
    }
    momentoNegativo["data"].push(y)

    z = parseFloat(tabla.childNodes[i].childNodes[2].childNodes[0].value);
    if (isNaN(z)) {
      z = 0;
    }
    momentoPositivo["data"].push(z)
  }

  minTicks = z;
  maxTicks = y;
  stepTicks = (y - z) / 10;
  updateChart(newData);
}

//Draw steel in canvas 
const acero = document.getElementById("table_detail");

function dibujarTablaNueva() {
  var titulo = `<tr>
    <th>Posición</th>
    <th>Acero negativo</th>
    <th>Acero positivo</th>
  </tr>`;
  acero.innerHTML = titulo;
  var numero = 1;

  for (var i = 0; i < 10; i++) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    input1 = document.createElement("input");
    input1.setAttribute("id", "posicion" + numero)
    input1.setAttribute("value", numero * 40)
    input2 = document.createElement("input");
    input2.setAttribute("id", "aceronegativo" + numero)
    input2.addEventListener("blur", dibujarAcero);
    input3 = document.createElement("input");
    input3.setAttribute("id", "aceropositivo" + numero)
    input3.addEventListener("blur", dibujarAcero);
    td1.appendChild(input1);
    td2.appendChild(input2);
    td3.appendChild(input3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    acero.appendChild(tr);
    numero++;
  }
}

dibujarTablaNueva()

var p = document.getElementById("detail");
var plano = p.getContext("2d");
var color, grosor;

function dibujarAcero(env) {
  var posicion = extraerNumero(env.target.id);

  //Define bar length
  if (posicion > 1) {
    xf = parseFloat(document.getElementById("posicion" + posicion).value);
    posicion-=1
    xi = parseFloat(document.getElementById("posicion" + posicion).value);
    posicion++
  } else {
    xf = parseFloat(document.getElementById("posicion" + posicion).value);
    xi = 10;
  }

  //Draw hook
  switch (posicion) {
    case "1":
      if (document.getElementById("aceronegativo" + posicion).value === "") {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(5, color, grosor);
      } else {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(5, color, grosor);
        color = "#000000";
        grosor = 1;
        dibujarGancho(5, color, grosor);
        break;
      }
    case acero.childNodes.length-1:
      if (document.getElementById("aceronegativo" + posicion).value === "") {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(xf + 5, color, grosor);
      } else {
        color = "#FFFFFF";
        grosor = 3;
        dibujarGancho(xf + 5, color, grosor);
        color = "#000000";
        grosor = 1;
        dibujarGancho(xf + 5, color, grosor);
        break;
      }
  }

  //Draw bar
  if (document.getElementById("aceronegativo" + posicion).value === "") {
    color = "#FFFFFF";
    grosor = 3;
    crearLinea(color, grosor, xi, xf)
  } else {
    color = "#FFFFFF";
    grosor = 3;
    crearLinea(color, grosor, xi, xf)
    color = "#000000";
    grosor = 1;
    crearLinea(color, grosor, xi, xf)
  }
}

function dibujarGancho(x, color, grosor) {
  plano.beginPath();
  plano.strokeStyle = color;
  plano.lineWidth = grosor;
  plano.moveTo(x, 75);
  plano.lineTo(x, 55);
  if (x === 5) {
    plano.arc(5 + x, 55, 5, Math.PI, 3 * Math.PI / 2, false);
  } else {
    plano.arc(x - 5, 55, 5, 4 * Math.PI / 2, 3 * Math.PI / 2, true);
  }
  plano.stroke();
  plano.closePath();
}

function crearLinea(color, grosor, xi, xf) {
  plano.beginPath();
  plano.strokeStyle = color;
  plano.lineWidth = grosor;
  plano.moveTo(xi, 50);
  plano.lineTo(xf, 50);
  plano.stroke();
  plano.closePath();
}

function extraerNumero(cadena) {
  a=1
  while (true) {
    if (isNaN(parseInt(cadena.substr(-a)))) {
      a=a-1
      return cadena.substr(-a)
      break
    } else {
      a++
    }
  }
}