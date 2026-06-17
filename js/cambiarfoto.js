console.log("✅ cambiarfoto.js cargado");

function cambiarfoto(id){

    console.log("📸 cambiarfoto",id);

    idFotoActual = id;

    document
    .getElementById("inputFoto")
    .click();

}

// 📸 ID del trabajador actual
let idFotoActual = "";


// 📸 Abrir cámara o galería
function cambiarfoto(id){

    idFotoActual = id;

    document
    .getElementById("inputFoto")
    .click();

}

document

.getElementById("inputFoto")

.addEventListener(

"change",

function(){

    let archivo = this.files[0];

    if(!archivo) return;

    let reader = new FileReader();

    reader.onload = function(e){

        let base64 = e.target.result;

        // quitar:
        // data:image/jpeg;base64,

        base64 = base64.split(",")[1];

        subirFotoGithub(

            idFotoActual,

            base64

        );

    };

    reader.readAsDataURL(archivo);

});

async function subirFotoGithub(

    id,

    imagen

){

try{

    let respuesta = await fetch(

        "https://github-fotos.agrot0782.workers.dev/upload",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                id:id,

                imagen:imagen

            })

        }

    );

    let datos = await respuesta.json();

    console.log(datos);

    if(datos.ok){

        alert(

            "✅ Fotografía guardada"

        );

    }

    else{

        alert(

            "❌ Error al guardar"

        );

        console.log(datos);

    }

}

catch(error){

    console.error(error);

}

}