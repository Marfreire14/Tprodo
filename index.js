
const getForm = document.querySelector("#get-form");
const tagPegar = document.querySelector("#tag");
const botao = document.querySelector("#botao");
const statusDados = document.querySelector("#status");
const placaDados = document.querySelector("#placa");
const dadaDados = document.querySelector("#data");
const horaDados = document.querySelector("#hora");
const idTpesagens = document.querySelector("#idtpesagens");




async function  pegarDadosTropo(consult){
    
    try {
        const conexaoDados = await fetch(`http://localhost:3000/api/tprodo/${consult}`);
        // https://viacep.com.br/ws/${consult}/json/`);
    
        const converteDados = await conexaoDados.json();
        console.log(conexaoDados);
        console.log(converteDados);
        

        if( conexaoDados.error){
            throw Error();
        }
        
      
        if(converteDados.status === 'ABERTA'){
            idTpesagens.innerHTML = converteDados.idtpesagens;
            statusDados.innerText = converteDados.status;
            placaDados.innerText = converteDados.placaVeiculo;
            dadaDados.innerText = converteDados.dataEntrada;
            horaDados.innerText = converteDados.horaEntrada;
            
            
        } else {
            alert("Pessagem não esta ABERTA.")
        }
        
        return idTpesagens;
        
    } catch (error) {
        console.log(error);
    }
    
    
}

async function enviarDadosTprodo(id) {
    
    try {
        
        const conexaoDados = await fetch(`http://localhost:3000/api/tprodo/${id}`, 
        {
            method: "PUT",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    "descarregamento": "true"
                })
                
            }
            );
            
        } catch (error) {
        console.log(error)
    }
    
}


getForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    pegarDadosTropo(tagPegar.value);
    
    
    
});

function carregar(){
    const id = idTpesagens.textContent;
    console.log(id)
    enviarDadosTprodo(id);
    idTpesagens.innerHTML = "";
    statusDados.innerHTML = "";
    placaDados.innerText = "";
    dadaDados.innerText = "";
    horaDados.innerText = "";
    
}

