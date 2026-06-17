window.verHistorial = function(){

    db.ref("historial_movimientos")

    .limitToLast(20)

    .once("value")

    .then(snapshot=>{

        let html = "";

        snapshot.forEach(item=>{

            let h = item.val();

            html += `

            <div style="
            text-align:left;
            padding:10px;
            border-bottom:1px solid #e5e7eb;
            ">

                <b>${h.nombre}</b>

                <br>

                🧑 ${h.usuario || "DESCONOCIDO"}

                <br>

                📅 ${h.fecha}

                <br>

                🔄 ${h.origen}

                →

                ${h.destino}

            </div>

            `;

        });

        Swal.fire({

            title:"📋 Historial de movimientos",

            html:`

            <div style="
            max-height:500px;
            overflow:auto;
            text-align:left;
            ">

            ${html}

            </div>

            `,

            width:700

        });

    });

}