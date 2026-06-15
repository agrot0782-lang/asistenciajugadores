// ✏️ EDITAR
function editarTrabajador(key){

    let trabajador = lista.find(p => p.key == key);

    if(!trabajador){

        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Trabajador no encontrado'


            
        });

        return;
    }

    Swal.fire({

    title:'',

    width:800,


html:`

<div style="text-align:center;margin-bottom:25px;">

<img
src="https://ui-avatars.com/api/?name=${trabajador.nombre}&background=random&color=fff&size=128"

style="
width:100px;
height:100px;
border-radius:50%;
object-fit:cover;
border:4px solid ${trabajador.sexo==='FEMENINO' ? '#f472b6' : '#60a5fa'};
box-shadow:0 6px 20px rgba(0,0,0,.20);
">

<h2 style="
margin-top:15px;
margin-bottom:5px;
font-size:24px;
font-weight:700;
">

${trabajador.nombre || ''}

</h2>

<div style="
color:#6b7280;
font-size:16px;
">

${trabajador.apellidos || ''}

</div>

<div style="
margin-top:15px;
font-size:15px;
line-height:1.8;
color:#4b5563;
">


👨 ${trabajador.sexo || '-'}

<br>

🛏 TRAILA ${trabajador.traila || '-'} • CAMA ${trabajador.cama || '-'}

<br>

${
trabajador.estado=="OCUPADO"
?
'🟢 OCUPADO'
:
trabajador.estado=="VACIA"
?
'⚪ VACIA'
:
'🔴 FUERA'
}

<br>

📍 ${trabajador.zona || 'SIN ZONA'}

<br>

💼 ${trabajador.actividad || '-'}


</div>

</div>
<hr style="
border:none;
height:1px;
background:#e5e7eb;
margin:25px 0;
">

<div class="swal-label">
ID
</div>

<input
id="swal-id"
class="swal2-input texto-mayus"
value="${trabajador.id || ''}">


<div class="swal-label">
NOMBRE
</div>

<input
id="swal-nombre"
class="swal2-input texto-mayus"
value="${trabajador.nombre || ''}">


<div class="swal-label">
APELLIDOS
</div>

<input
id="swal-apellidos"
class="swal2-input texto-mayus"
value="${trabajador.apellidos || ''}">


<div class="swal-label">
SEXO
</div>

<select
id="swal-sexo"
class="swal-select">

<option value="MASCULINO"
${trabajador.sexo === 'MASCULINO' ? 'selected' : ''}>
MASCULINO
</option>

<option value="FEMENINO"
${trabajador.sexo === 'FEMENINO' ? 'selected' : ''}>
FEMENINO
</option>

</select>


<div style="
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
width:79%;
margin:auto;
">

<div>

<div class="swal-label">
TRAILA
</div>

<input
id="swal-traila"
class="swal2-input texto-mayus"
value="${trabajador.traila || ''}">

</div>


<div>

<div class="swal-label">
CAMA
</div>

<input
id="swal-cama"
class="swal2-input texto-mayus"
value="${trabajador.cama || ''}">

</div>

</div>


<div class="swal-label">
ESTADO
</div>

<select
id="swal-estado"
class="swal-select">

<option value="OCUPADO"
${trabajador.estado === 'OCUPADO' ? 'selected' : ''}>
OCUPADO
</option>

<option value="VACIA"
${trabajador.estado === 'VACIA' ? 'selected' : ''}>
VACIA
</option>

</select>

        `,

        showCancelButton:true,
        confirmButtonText:'Guardar',
        cancelButtonText:'Cancelar',
        confirmButtonColor:'#3085d6',

       didOpen:()=>{

    document.querySelectorAll('.texto-mayus').forEach(input=>{

        input.addEventListener('input', function(){

            this.value = this.value.toUpperCase();

        });

    });

 // 🔥 AUTOCOMPLETAR POR ID
const inputID = document.getElementById('swal-id');

inputID.addEventListener('blur', ()=>{

    let idBuscado = inputID.value.trim().toUpperCase();

    if(!idBuscado){
        return;
    }

    db.ref("trabajadores/" + idBuscado)
    .once("value", snapshot => {

        if(snapshot.exists()){

            let data = snapshot.val();

            document.getElementById('swal-nombre').value =
                data.nombre || '';

            document.getElementById('swal-apellidos').value =
                ((data.apellido_paterno || '') + ' ' +
                 (data.apellido_materno || '')).trim();

            document.getElementById('swal-sexo').value =
                data.sexo || 'MASCULINO';

        } else {

            document.getElementById('swal-nombre').value = '';
            document.getElementById('swal-apellidos').value = '';

        }

    });

});

},

        preConfirm:()=>{

            return {

                nuevoID:
                    document.getElementById('swal-id').value.toUpperCase(),

                nuevoNombre:
                    document.getElementById('swal-nombre').value.toUpperCase(),

                nuevosApellidos:
                    document.getElementById('swal-apellidos').value.toUpperCase(),

                nuevoSexo:
                    document.getElementById('swal-sexo').value.toUpperCase(),

                nuevaTraila:
                    document.getElementById('swal-traila').value.toUpperCase(),

                nuevaCama:
                    document.getElementById('swal-cama').value.toUpperCase(),

                nuevoEstado:
                    document.getElementById('swal-estado').value.toUpperCase()

            };

        }

    }).then((result)=>{

        if(!result.isConfirmed){
            return;
        }

        let {
            nuevoID,
            nuevoNombre,
            nuevosApellidos,
            nuevoSexo,
            nuevaTraila,
            nuevaCama,
            nuevoEstado
        } = result.value;

        // 🔥 VALIDAR SI EL ID YA ESTA OCUPADO
        db.ref("censo_cajon")
        .orderByChild("id")
        .equalTo(texto(nuevoID))
        .once("value", snapshot => {

            let encontrado = null;

            snapshot.forEach(child => {

                let d = child.val();

                if(
                    child.key !== key &&
                    d.estado === ESTADOS.OCUPADO
                ){

                    encontrado = {
                        key: child.key,
                        traila: d.traila,
                        cama: d.cama
                    };

                }

            });

            // 🔥 SI YA TIENE CAMA
            if(encontrado){

                Swal.fire({

                    title:'Trabajador ya asignado',

                    text:
                    `Actualmente está en Traila ${encontrado.traila} Cama ${encontrado.cama}`,

                    icon:'warning',

                    showCancelButton:true,

                    confirmButtonText:'Mover trabajador',
                    cancelButtonText:'Cancelar'

                }).then((moveResult)=>{

                    if(!moveResult.isConfirmed){
                        return;
                    }

                    moverTrabajador();

                });

            }
            else{

                moverTrabajador();

            }

            // 🔥 FUNCION INTERNA
            function moverTrabajador(){

                let nuevaKey = nuevaTraila + "_" + nuevaCama;

                // 🔥 VALIDAR NUEVA CAMA
                db.ref("censo_cajon/" + nuevaKey)
                .once("value", snap => {

                    let cama = snap.val();

                    // 🚫 SI LA CAMA ESTA OCUPADA
                    if(
                        cama &&
                        cama.estado === ESTADOS.OCUPADO &&
                        texto(cama.id) !== texto(nuevoID)
                    ){

                        Swal.fire({
                            icon:'warning',
                            title:'Cama ocupada',
                            text:'Esa cama ya está ocupada'
                        });

                        return;
                    }

                    // 🔥 VACIAR CAMA ANTERIOR
                    if(encontrado){

                        db.ref("censo_cajon/" + encontrado.key).update({

                            id:"",
                            nombre:"",
                            apellidos:"",
                            sexo:"",
                            estado:ESTADOS.VACIA

                        });

                    }

                    // 🔥 SI CAMBIO DE CAMA
                    if(nuevaKey !== key){

                        db.ref("censo_cajon/" + key).update({

                            id:"",
                            nombre:"",
                            apellidos:"",
                            sexo:"",
                            estado:ESTADOS.VACIA

                        });

                    }

                    // 🔥 GUARDAR NUEVA ASIGNACION
                    db.ref("censo_cajon/" + nuevaKey).set({

                        id: texto(nuevoID),
                        nombre: texto(nuevoNombre),
                        apellidos: texto(nuevosApellidos),
                        traila: nuevaTraila,
                        cama: nuevaCama,
                        sexo: texto(nuevoSexo),
                        estado: texto(nuevoEstado)

                    });

                    Swal.fire({
                        icon:'success',
                        title:'Actualizado',
                        text:'Trabajador actualizado correctamente',
                        confirmButtonColor:'#3085d6'
                    });

                });

            }

        });

    });

}
