// 🔥 TRABAJADORES
db.ref("trabajadores").on("value", snapshot => {

// 🔥 AREAS
db.ref("areas").on("value", snapshot => {

    areas = snapshot.val() || {};

    dataAreas = true;

    intentarRender();

});
    trabajadores = snapshot.val() || {};

    dataTrabajadores = true;

    intentarRender();

});



// 🔥 CENSO
 db.ref("censo_cajon").on("value", snapshot => {

    lista = [];

    snapshot.forEach(child => {

        let d = child.val();

        lista.push({
            key: child.key,
            id: d.id || "",
            nombre: d.nombre || "",
            apellidos: d.apellidos || "",
            traila: d.traila || "",
            cama: d.cama || "",
            sexo: d.sexo || "",
            estado: d.estado || ESTADOS.VACIA
        });

    });


    listaFiltrada = [...lista];

    dataCenso = true;

    intentarRender();

});

// 🔥 CONTROL
function intentarRender(){

    if(dataCenso && dataTrabajadores && areas){
        render();
    }

}

// 🔥 RENDER
function render(){

    if(listaFiltrada.length === 0){

        document.getElementById("tabla").innerHTML =
        "<tr><td colspan='9'>Sin datos</td></tr>";

        return;
    }

    let html = "";

    let ocupadas = 0;
    let vacias = 0;
    let fuera = 0;
    let hombres = 0;
    let mujeres = 0;

    let zonas = {};

    let clases = {
        OCUPADO:"ocupado",
        VACIA:"vacio",
        FUERA:"fuera"
    };

    listaFiltrada.forEach(p => {
        
        let area = areas[p.id] || {};
        let clase = clases[p.estado] || "vacio";

        if(p.estado === ESTADOS.OCUPADO) ocupadas++;
        if(p.estado === ESTADOS.VACIA) vacias++;
        if(p.estado === ESTADOS.FUERA) fuera++;

        if(p.sexo === "MASCULINO") hombres++;
        if(p.sexo === "FEMENINO") mujeres++;

        let zona = trabajadores[p.id]?.zona || "SIN ZONA";

        zonas[zona] = (zonas[zona] || 0) + 1;

        html += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.apellidos}</td>
            <td>${p.traila}</td>
            <td>${p.cama}</td>
            <td>${p.sexo}</td>
            <td>${zona}</td>
            <td>${area.actividad || "-"}</td>
            <td class="${clase}">${p.estado}</td>
          <td>

${autenticado ? `

    <button
        style="color:#f97316;"
        onclick="pruebaPanel('${p.key}')"
        title="Editar trabajador"
    >
        <i data-lucide="square-pen"></i>
    </button>

    <button
        style="color:#7c3aed;"
        onclick="vaciarCama('${p.key}')"
        title="Vaciar cama"
    >
        <i data-lucide="bed-single"></i>
    </button>
<button
style="
background:#ef4444;
color:white;
"
onclick="ponerFuera('${p.key}')">

Fuera

</button>



` : ``}

</td>
        </tr>`;

    });

    document.getElementById("tabla").innerHTML = html;
lucide.createIcons();
    document.getElementById("total").innerText = lista.length;
    document.getElementById("ocupadas").innerText = ocupadas;
    document.getElementById("vacias").innerText = vacias;
    document.getElementById("fuera").innerText = fuera;
    document.getElementById("hombres").innerText = hombres;
    document.getElementById("mujeres").innerText = mujeres;

    //document.getElementById("total-zonas").innerText =
    //lista.length + " personas";

   
    // 🔥 TOP ZONAS

let colores = [

    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6"
];

let topZonas =
Object.entries(zonas)
.sort((a,b)=>b[1]-a[1])
.slice(0,10);

let zonasHTML = "";

topZonas.forEach((z,index)=>{

    let nombre = z[0];

    let total = z[1];

    let porcentaje =
    (total / ocupadas) * 100;

    zonasHTML += `

    <div class="zona-item">

        <div class="zona-top">

            <span>${nombre}</span>

            <span>${total}</span>

        </div>

        <div class="zona-bar">

            <div
            class="zona-fill"
            style="
            width:${porcentaje}%;
            background:${colores[index]};
            ">
            </div>

        </div>

    </div>

    `;

});

document
.getElementById("zonasMini")
.innerHTML = zonasHTML;

lucide.createIcons();

    // 🔥 INSIGHT
    let porcentaje = ((ocupadas/lista.length)*100).toFixed(1);
    
    let disp = lista.filter(
    p => p.estado === ESTADOS.VACIA
).length;
    
    let textoInsight = "🟢 Baja ocupación";

    if(porcentaje > 80){
        textoInsight = "🔥 Alta ocupación";
    }
    else if(porcentaje > 50){
        textoInsight = "⚠️ Ocupación media";
    }

    document.getElementById("insight-percent").innerText =
    `${textoInsight} (${porcentaje}%)`;

    document.getElementById("insight-disp").innerText =
    `Hay ${disp} camas disponibles`;
   
    
    // 🔥 MAPA RELACIONADO

let listaMapa = [...lista];

if(listaFiltrada.length > 0){

    let trailasBusqueda =
    [...new Set(
        listaFiltrada.map(p => p.traila)
    )];

    listaMapa = lista.filter(p =>
        trailasBusqueda.includes(p.traila)
    );

}

// 🔥 MAPA VISUAL

let mapaHTML =
'<div class="camas-grid">';

listaMapa.forEach(p => {
try{
    if(!p.cama) return;

    let color =
    'linear-gradient(135deg,#6b7280,#4b5563)';

    // 🔥 VERDE
    if(p.estado === "OCUPADO"){

        color =
        'linear-gradient(135deg,#22c55e,#16a34a)';

    }

    // 🔥 ROJO
    if(p.estado === "FUERA"){

        color =
        'linear-gradient(135deg,#ef4444,#dc2626)';

    }

mapaHTML += `

<div
class="cama-card"
style="background:${color}">


<div class="cama-top">

    <div class="cama-num">
        ${p.cama}
    </div>

    <div class="cama-estado">
        ${p.estado || "VACIA"}
    </div>

</div>

<img

class="cama-foto ${p.sexo==='FEMENINO' ? 'foto-mujer' : 'foto-hombre'}"

src="https://raw.githubusercontent.com/agrot0782-lang/censocajon/main/fotos/${p.id}.jpg?${Date.now()}"

onerror="
this.src='https://ui-avatars.com/api/?name=${p.nombre}&background=random&color=fff&size=128'
"

>

<div class="cama-nombre">
    ${p.nombre || "DISPONIBLE"}
</div>

<div class="cama-badge">
    ${p.estado}
</div>

<div class="cama-traila">
    TRAILA ${p.traila || ""}
</div>



${autenticado ? `

<div class="cama-actions">

    <button
    class="cama-btn btn-editar"
    onclick="pruebaPanel('${p.key}')">

        Editar

    </button>

    <button
    class="cama-btn btn-vaciar"
    onclick="vaciarCama('${p.key}')">

        Vaciar

    </button>

</div>

` : ``}
    </div>

    `;
    }

    catch(error){

        console.log("ERROR EN REGISTRO:", p);

        console.log(error);

    }
});

mapaHTML += '</div>';

document
.getElementById("mapaCamas")
.innerHTML = mapaHTML;
renderMiniDashZonas(listaFiltrada);
}


// 🔥 ORDENAR
function ordenarPor(campo){

    if(ordenActual.campo === campo){
        ordenActual.asc = !ordenActual.asc;
    }
    else{
        ordenActual.campo = campo;
        ordenActual.asc = true;
    }

    listaFiltrada.sort((a,b)=>{

        let valA = parseInt(a[campo]) || 0;
        let valB = parseInt(b[campo]) || 0;

        return ordenActual.asc
            ? valA - valB
            : valB - valA;

    });

    render();

}
