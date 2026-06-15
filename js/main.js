    // 🔥 ICONOS DASHBOARD
 lucide.createIcons();
function iniciarSesion(){

    Swal.fire({

        title: 'Iniciar Sesión',

        input: 'password',

        inputPlaceholder: 'Contraseña',

        confirmButtonText: 'Entrar',

        background:'#111827',

        color:'white',

        confirmButtonColor:'#2563eb',

        showCancelButton:true,

        cancelButtonText:'Cancelar'

    }).then((result)=>{

        if(!result.isConfirmed){
            return;
        }

        if(result.value === "1234"){


            autenticado = true;

            document
.querySelectorAll(".btn-admin")
.forEach(btn => {

    btn.classList.remove("oculto");
btn.style.display = "flex";
});

            Swal.fire({
                icon:'success',
                title:'Acceso concedido',
                timer:1500,
                showConfirmButton:false
            });

            render();

        }

        else{

            Swal.fire({
                icon:'error',
                title:'Contraseña incorrecta'
            });

        }

    });

}

// 🔥 BORRAR TODO
function borrarTodo(){

    if(confirm("⚠️ Esto borrará todo el censo. ¿Continuar?")){

        db.ref("censo_cajon").remove();

    }

}
