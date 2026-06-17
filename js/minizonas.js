function renderMiniDashZonas(datos){

    const vaciasParejas = datos.filter(p =>
        p.estado === ESTADOS.VACIA &&
        Number(p.traila) >= 1 &&
        Number(p.traila) <= 13
    ).length;

    const vaciasMujeres = datos.filter(p =>
        p.estado === ESTADOS.VACIA &&
        (
            (Number(p.traila) >= 14 && Number(p.traila) <= 19) ||
            Number(p.traila) === 61
        )
    ).length;

    const vaciasHombres = datos.filter(p =>
        p.estado === ESTADOS.VACIA &&
        Number(p.traila) >= 20 &&
        Number(p.traila) <= 60
    ).length;

    document.getElementById("miniDashZonas").innerHTML = `

        <div class="mini-zonas">

            <div class="zona-card parejas">
                <span>❤️ Parejas-DISP</span>
                <h2>${vaciasParejas}</h2>
                <small>Trailas 1-13</small>
            </div>

            <div class="zona-card mujeres">
                <span>👩 Mujeres-DISP</span>
                <h2>${vaciasMujeres}</h2>
                <small>14-19 + 61</small>
            </div>

            <div class="zona-card hombres">
                <span>👨 Hombres-DISP</span>
                <h2>${vaciasHombres}</h2>
                <small>20-60</small>
            </div>

        </div>
    `;
}