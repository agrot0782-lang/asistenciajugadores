// 🔥 VACIAR CAMA

function vaciarCama(key){

    // 🔥 CONFIRMACION
    let confirmar = confirm(
        "¿Seguro que deseas vaciar esta cama?"
    );

    if(!confirmar) return;

    // 🔥 LIMPIAR CAMA
    db.ref("censo_cajon/" + key)
    .update({

        id:"",
        nombre:"",
        apellidos:"",
        sexo:"",
        zona:"",
        celular:"",
        posicion:"",
        estado:"VACIA"

    })

    .then(()=>{

        console.log("✅ Cama vaciada");

    })

    .catch(error => {

        console.error(
            "❌ Error al vaciar cama:",
            error
        );

    });

}

// 🔴 PONER FUERA

function ponerFuera(key){

    let confirmar = confirm(
        "¿Marcar trabajador como FUERA?"
    );

    if(!confirmar) return;

    db.ref("censo_cajon/" + key)
    .update({

        estado:"FUERA"

    })
    .then(()=>{

        console.log("✅ Trabajador marcado como FUERA");

    })

    .catch(error=>{

        console.error(
            "❌ Error:",
            error
        );

    });

}