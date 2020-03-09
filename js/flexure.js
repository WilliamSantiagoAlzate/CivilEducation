//Update equation in realtime 
document.getElementById("mu").addEventListener("input", mostrar);
document.getElementById("fc").addEventListener("input", mostrar);
document.getElementById("fy").addEventListener("input", mostrar);
document.getElementById("b").addEventListener("input", mostrar);
document.getElementById("h").addEventListener("input", mostrar);
document.getElementById("cr").addEventListener("input", mostrar);

function mostrar() {
    var muValue = parseFloat(document.getElementById("mu").value) / 1000;
    var fcValue = parseFloat(document.getElementById("fc").value);
    var fyValue = parseFloat(document.getElementById("fy").value);
    var bValue = parseFloat(document.getElementById("b").value);
    var hValue = parseFloat(document.getElementById("h").value);
    var crValue = parseFloat(document.getElementById("cr").value);
    var dValue;

    if (isNaN(muValue)) {
    muValue = "Mu";
    }
    if (isNaN(fcValue)) {
    fcValue = "f'c";
    }
    if (isNaN(fyValue)) {
    fyValue = "fy";
    }
    if (isNaN(bValue)) {
    bValue = "B";
    }
    if (isNaN(hValue) || isNaN(crValue)) {
    dValue = "d";
    } else {
    dValue = parseFloat((Math.round((hValue - crValue) * 100) / 100).toFixed(2));    
    }

    //Calculate value of a
    var aValue = dValue - Math.sqrt(Math.pow(dValue, 2) - (2 * muValue / (0.765 * bValue * fcValue)));
    console.log(dValue, muValue, bValue, fcValue, asValue);

    if (isNaN(aValue)) {
        document.getElementById("a").value = 0;
    } else {
        document.getElementById("a").value = parseFloat((Math.round((aValue) * 100) / 100).toFixed(5));
    }

    //Calculate value of As
    var asValue = muValue / (0.9 * fyValue * (dValue - (aValue / 2)));

    if (isNaN(asValue)) {
        document.getElementById("as").value = 0;
    } else {
        document.getElementById("as").value = parseFloat((Math.round((asValue * 10000) * 100) / 100).toFixed(2));
    }
  
    //Update first equation
    const resultado1 = document.getElementById("result-1");
    var input1 = `a = ${dValue} - \\sqrt{${dValue}^2-{2(${muValue})\\over 0.765(${bValue})(${fcValue})}}`;
    updateEqua(resultado1, input1);
    
    //Update second equation
    const resultado2 = document.getElementById("result-2");
    var input2 = `As = {${muValue}\\over 0.9(${fyValue})(${dValue}-{a\\over 2})}`;
    updateEqua(resultado2, input2);
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