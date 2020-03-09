//Update equation in realtime 
document.getElementById("vu").addEventListener("input", mostrar);
document.getElementById("fc").addEventListener("input", mostrar);
document.getElementById("fy").addEventListener("input", mostrar);
document.getElementById("av").addEventListener("input", mostrar);
document.getElementById("b").addEventListener("input", mostrar);
document.getElementById("h").addEventListener("input", mostrar);
document.getElementById("cr").addEventListener("input", mostrar);

function mostrar() {
    var vuValue = parseFloat(document.getElementById("vu").value) / 1000;
    var fcValue = parseFloat(document.getElementById("fc").value);
    var fyValue = parseFloat(document.getElementById("fy").value);
    var avValue = parseFloat(document.getElementById("av").value) / 10000;
    var bValue = parseFloat(document.getElementById("b").value);
    var hValue = parseFloat(document.getElementById("h").value);
    var crValue = parseFloat(document.getElementById("cr").value);
    var dValue;

    if (isNaN(vuValue)) {
    vuValue = "Vu";
    }
    if (isNaN(fcValue)) {
    fcValue = "f'c";
    }
    if (isNaN(fyValue)) {
    fyValue = "fy";
    }
    if (isNaN(avValue)) {
    avValue = "Av";
    }
    if (isNaN(bValue)) {
    bValue = "B";
    }
    if (isNaN(hValue) || isNaN(crValue)) {
    dValue = "d";
    } else {
    dValue = parseFloat((Math.round((hValue - crValue) * 100) / 100).toFixed(2));    
    }

    //Calculate value of S
    var sValue = (0.75 * avValue * fyValue * dValue) / (vuValue - 0.1275 * bValue * dValue * Math.sqrt(fcValue));

    if (isNaN(sValue)) {
        document.getElementById("s").value = 0;
    } else {
        document.getElementById("s").value = parseFloat((Math.round((sValue) * 100) / 100).toFixed(2));
    }
  
    //Update first equation
    const resultado = document.getElementById("result");
    var input = `S = {(${avValue})(${fyValue})(${dValue})\\over {${vuValue} - 0.1275(${bValue})(${dValue})\\sqrt{${fcValue}}}}`;
    updateEqua(resultado, input);
    
}

function updateEqua(resultado, input) {
    resultado.innerHTML = "";
    MathJax.texReset();
    var options = MathJax.getMetricsFor(resultado);
    MathJax.tex2chtmlPromise(input, options).then(function (node) {
        resultado.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    }).catch(function (error) {
        console.log(error);
    })
}

//Draw beam section
var seccionViga = document.getElementById("seccionViga").getContext("2d");

var datoAltura, datoBase;
var altura = document.getElementById("h");
var base = document.getElementById("b");
altura.addEventListener("blur", dibujar);
base.addEventListener("blur", dibujar);

datoAltura = 500 * parseFloat(altura.value);
datoBase = 500 * parseFloat(base.value);
color = "#000000";
grosor = 1;
draw();

function dibujar() {
  color = "#FFFFFF";
  grosor = 3;
  draw();
  borrarTexto();
  datoAltura = 500 * parseFloat(altura.value);
  datoBase = 500 * parseFloat(base.value);
  color = "#000000";
  grosor = 1;
  draw();
}

function draw() {
  if (isNaN(datoAltura)) {
    datoAltura = 100;
  }
  if (isNaN(datoBase)) {
    datoBase = 100;
  }

  seccionViga.beginPath();
  seccionViga.strokeStyle = color;
  seccionViga.lineWidth = grosor;

  seccionViga.arc(60, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(45 + datoBase/2, 65);
  seccionViga.arc(40 + datoBase/2, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(25 + datoBase, 65);
  seccionViga.arc(20 + datoBase, 65, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(65, 20 + datoAltura);
  seccionViga.arc(60, 20 + datoAltura, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(45 + datoBase/2, 20 + datoAltura);
  seccionViga.arc(40 + datoBase/2, 20 + datoAltura, 5, 0, Math.PI * 2, true);
  seccionViga.moveTo(25 + datoBase, 20 + datoAltura);
  seccionViga.arc(20 + datoBase, 20 + datoAltura, 5, 0, Math.PI * 2, true);

  seccionViga.moveTo(40, 45);
  seccionViga.lineTo(40 + datoBase, 45);
  seccionViga.lineTo(40 + datoBase, 45 + datoAltura);
  seccionViga.lineTo(40, 45 + datoAltura);
  seccionViga.lineTo(40, 45);

  seccionViga.font = "15px Verdana";
  seccionViga.fillStyle = color;
  seccionViga.textAlign = "start";
  seccionViga.fillText(datoAltura/5 + " cm", 40 + datoBase + 10, 45 + datoAltura/2);
  seccionViga.textAlign = "center";
  seccionViga.fillText(datoBase/5 + " cm", 40 + datoBase/2, 45 + datoAltura + 20);

  seccionViga.stroke();
  seccionViga.closePath();
}

function borrarTexto() {
  seccionViga.beginPath();
  seccionViga.strokeStyle = color;
  seccionViga.lineWidth = grosor;

  //Borrar texto de altura
  seccionViga.moveTo(35 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.lineTo(115 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.lineTo(115 + datoBase + 10, 50 + datoAltura/2);
  seccionViga.lineTo(35 + datoBase + 10, 50 + datoAltura/2);
  seccionViga.lineTo(35 + datoBase + 10, 30 + datoAltura/2);
  seccionViga.fill();

  //Borrar texto de base
  seccionViga.moveTo(datoBase/2, 30 + datoAltura + 20);
  seccionViga.lineTo(80 + datoBase/2, 30 + datoAltura + 20);
  seccionViga.lineTo(80 + datoBase/2, 50 + datoAltura + 20);
  seccionViga.lineTo(datoBase/2, 50 + datoAltura + 20);
  seccionViga.lineTo(datoBase/2, 30 + datoAltura + 20);
  seccionViga.fill();

  seccionViga.stroke();
  seccionViga.closePath();
}