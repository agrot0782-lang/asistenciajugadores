// 🔥 BUSCADOR
window.addEventListener("DOMContentLoaded", ()=>{

    document
    .getElementById("buscar")
    .addEventListener("input", e => {

        let textoBusqueda =
        e.target.value.toLowerCase();

        listaFiltrada = lista.filter(item => {

            return (

                String(item.id || "")
                .toLowerCase()
                .includes(textoBusqueda)

                ||

                String(item.nombre || "")
                .toLowerCase()
                .includes(textoBusqueda)

                ||

                String(item.apellidos || "")
                .toLowerCase()
                .includes(textoBusqueda)

                ||

               (
    textoBusqueda.startsWith("traila:")

    ?

    String(item.traila || "")
    .toLowerCase()

    ===

    textoBusqueda
    .replace("traila:","")
    .trim()

    :

    String(item.traila || "")
    .toLowerCase()
    .includes(textoBusqueda)
)

            );

        });

        render();

    });

});