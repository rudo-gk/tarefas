function anotar_agora(){
            let tarefa = document.getElementById("tarefa").value;
            let status = document.getElementById("status").value;
            let container = document.getElementById("container");
            let p = document.createElement("div");
            container.appendChild(p);

            p.classList.add("card");
            p.style.width = "200px";
            p.style.height = "80px";
            p.classList.add("d-inline-block");
            p.classList.add("card-body");

           if(status === "Concluido"){
                p.classList.add("bg-success");

            } else if(status === "Pendente"){
                p.classList.add("bg-danger");

            } else {
                p.classList.add("bg-warning");
            }
            p.innerText = (tarefa + " --> " + status);
        }
