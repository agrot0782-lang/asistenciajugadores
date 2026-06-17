function iniciarSesion(){

    Swal.fire({

        title:'🔐 Iniciar Sesión',

        html:`

        <input
        id="swal-usuario"
        class="swal2-input"
        placeholder="Usuario">

        <input
        id="swal-password"
        type="password"
        class="swal2-input"
        placeholder="Contraseña">

        `,

        background:'#111827',

        color:'white',

        confirmButtonColor:'#2563eb',

        confirmButtonText:'Entrar',

        showCancelButton:true,

        cancelButtonText:'Cancelar',

        focusConfirm:false,

        preConfirm:()=>{

            return {

                usuario:
                document
                .getElementById("swal-usuario")
                .value
                .trim(),

                password:
                document
                .getElementById("swal-password")
                .value

            };

        }

    }).then((result)=>{

        if(!result.isConfirmed){

            return;

        }

        let usuarioIngresado =
        result.value.usuario;

        let passwordIngresado =
        result.value.password;

        db

        .ref("usuarios/" + usuarioIngresado)

        .once("value")

        .then(snapshot=>{

            if(!snapshot.exists()){

                Swal.fire({

                    icon:"error",

                    title:"Usuario inexistente"

                });

                return;

            }

            let usuario = snapshot.val();

            if(passwordIngresado != usuario.password){

                Swal.fire({

                    icon:"error",

                    title:"Contraseña incorrecta"

                });

                return;

            }

            // LOGIN EXITOSO

            autenticado = true;

            window.usuarioActual =
            usuario.nombre;

            window.rolActual =
            usuario.rol;

            sessionStorage.setItem(

    "usuarioActual",

    usuario.nombre

);

sessionStorage.setItem(

    "rolActual",

    usuario.rol

);
            // mostrar botones admin

            document

            .querySelectorAll(".btn-admin")

            .forEach(btn=>{

                btn.classList.remove("oculto");

                btn.style.display = "flex";

            });

            Swal.fire({

                icon:"success",

                title:`Bienvenido ${usuario.nombre}`,

                text:usuario.rol,

                timer:1500,

                showConfirmButton:false

            });

            render();

        })

        .catch(error=>{

            console.error(error);

            Swal.fire({

                icon:"error",

                title:"Error",

                text:error.message

            });

        });

    });

}