// 🔥 EXPORTAR EXCEL BONITO
async function exportarExcelBonito(){

    console.log("🔥 EXPORTANDO...");

    // 🔥 CALCULOS
    let ocupadas =
    lista.filter(
        p => p.estado === "OCUPADO"
    ).length;

    let vacias =
    lista.filter(
        p => p.estado === "VACIA"
    ).length;

    // 🔥 NUEVOS CONTADORES
    const vaciasParejas = lista.filter(p =>
        p.estado === "VACIA" &&
        Number(p.traila) >= 1 &&
        Number(p.traila) <= 13
    ).length;

    const vaciasMujeres = lista.filter(p =>
        p.estado === "VACIA" &&
        (
            (Number(p.traila) >= 14 &&
            Number(p.traila) <= 19)
            ||
            Number(p.traila) === 61
        )
    ).length;

    const vaciasHombres = lista.filter(p =>
        p.estado === "VACIA" &&
        Number(p.traila) >= 20 &&
        Number(p.traila) <= 60
    ).length;

    let porcentaje =

    (
        (ocupadas / lista.length)
        * 100
    )

    .toFixed(1);

    // 🔥 WORKBOOK
    const workbook =
    new ExcelJS.Workbook();

    const sheet =
    workbook.addWorksheet(
        "Reporte General"
    );

    // 🔥 TITULO
    sheet.mergeCells("A1:L1");

    const titulo =
    sheet.getCell("A1");

    titulo.value =
    "CAMPO CAJÓN - REPORTE GENERAL";

    titulo.font = {

        bold:true,
        size:18,
        color:{
            argb:"FFFFFF"
        }

    };

    titulo.fill = {

        type:"pattern",

        pattern:"solid",

        fgColor:{
            argb:"2563EB"
        }

    };

    titulo.alignment = {

        horizontal:"center",
        vertical:"middle"

    };

    sheet.getRow(1).height = 28;

    // 🔥 ESPACIO
    sheet.addRow([]);

    // 🔥 DASHBOARD
    sheet.addRow([
        "Total",
        lista.length
    ]);

    sheet.addRow([
        "Ocupadas",
        ocupadas
    ]);

    sheet.addRow([
        "Vacías General",
        vacias
    ]);

    // 🔥 NUEVAS FILAS
    sheet.addRow([
        "Parejas",
        vaciasParejas + " camas disponibles"
    ]);

    sheet.addRow([
        "Mujeres",
        vaciasMujeres + " camas disponibles"
    ]);

    sheet.addRow([
        "Hombres",
        vaciasHombres + " camas disponibles"
    ]);

    sheet.addRow([
        "Ocupación",
        porcentaje + "%"
    ]);

    // 🔥 ESPACIO
    sheet.addRow([]);

    // 🔥 HEADERS
    const header =
    sheet.addRow([

        "ID",
        "Nombre",
        "Apellidos",
        "Traila",
        "Cama",
        "Sexo",
        "Zona",
        "Actividad",
        "Supervisor",
        "Grupo",
        "Centro Costo",
        "Estado"

    ]);

    // 🔥 ESTILO HEADERS
    header.eachCell(cell => {

        cell.font = {

            bold:true,

            color:{
                argb:"FFFFFF"
            }

        };

        cell.fill = {

            type:"pattern",

            pattern:"solid",

            fgColor:{
                argb:"111827"
            }

        };

        cell.alignment = {

            horizontal:"center",
            vertical:"middle"

        };

        cell.border = {

            top:{
                style:"thin"
            },

            left:{
                style:"thin"
            },

            bottom:{
                style:"thin"
            },

            right:{
                style:"thin"
            }

        };

    });

    // 🔥 DATOS
    listaFiltrada.forEach(p => {

        let zona =
        trabajadores[p.id]?.zona || "";

        let area =
        areas[p.id] || {};

        let row = sheet.addRow([

            p.id || "",
            p.nombre || "",
            p.apellidos || "",
            Number(p.traila) || 0,
            Number(p.cama) || 0,
            p.sexo || "",
            zona || "",
            area.actividad || "",
            area.supervisor || "",
            area.grupo || "",
            area.centro_costo || "",
            p.estado || ""

        ]);

        // 🔥 COLOR ESTADO
        let estadoCell =
        row.getCell(12);

        if(p.estado === "OCUPADO"){

            estadoCell.fill = {

                type:"pattern",

                pattern:"solid",

                fgColor:{
                    argb:"DCFCE7"
                }

            };

            estadoCell.font = {

                bold:true,

                color:{
                    argb:"166534"
                }

            };

        }

        if(p.estado === "VACIA"){

            estadoCell.fill = {

                type:"pattern",

                pattern:"solid",

                fgColor:{
                    argb:"E5E7EB"
                }

            };

            estadoCell.font = {

                bold:true,

                color:{
                    argb:"374151"
                }

            };

        }

        if(p.estado === "FUERA"){

            estadoCell.fill = {

                type:"pattern",

                pattern:"solid",

                fgColor:{
                    argb:"FEE2E2"
                }

            };

            estadoCell.font = {

                bold:true,

                color:{
                    argb:"991B1B"
                }

            };

        }

        // 🔥 BORDES
        row.eachCell(cell => {

            cell.border = {

                top:{
                    style:"thin"
                },

                left:{
                    style:"thin"
                },

                bottom:{
                    style:"thin"
                },

                right:{
                    style:"thin"
                }

            };

        });

    });

    // 🔥 ANCHO COLUMNAS
    sheet.columns = [

        { width:15 },
        { width:25 },
        { width:35 },
        { width:10 },
        { width:10 },
        { width:15 },
        { width:20 },
        { width:35 },
        { width:35 },
        { width:18 },
        { width:25 },
        { width:15 }

    ];

    // 🔥 FILTROS
    sheet.autoFilter = {

        from:"A11",
        to:"L11"

    };

    // 🔥 CONGELAR HEADERS
    sheet.views = [
        {
            state:"frozen",
            ySplit:10
        }
    ];

    // 🔥 GENERAR BUFFER
    const buffer =

    await workbook.xlsx.writeBuffer();

    // 🔥 BLOB
    const blob = new Blob(

        [buffer],

        {

            type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        }

    );

    // 🔥 URL
    const url =
    window.URL.createObjectURL(blob);

    // 🔥 DESCARGAR
    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "Reporte_Campo_Cajon.xlsx";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    // 🔥 LIMPIAR
    window.URL.revokeObjectURL(url);

    console.log("✅ Excel descargado");

}