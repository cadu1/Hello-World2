//Funcao de validacao do formulario de cadastro do usuario.
function validaFaleConosco()
{
    var algum_problema      = false;

    var email               = $("#email");
    var nome                = $("#nome");
    var assunto             = $("#assunto");
    var mensagem            = $("#mensagem");
    var validacao_email     = $("#validacao_email");
    var validacao_nome      = $("#validacao_nome");
    var validacao_mensagem  = $("#validacao_mensagem");
    var validacao_assunto   = $("#validacao_assunto");

     // Nome
    if(nome.val() != ""){
	if(validaNome(nome,true)==false){
            marcaErro(nome);
            validacao_nome.html("Preencha este campo corretamente.");
	    algum_problema = true;
	}
        else{
            marcaAcerto(nome);
            validacao_nome.html("");
        }
    }
    else{
	marcaErro(nome);
        validacao_nome.html("Preencha este campo corretamente.");
	algum_problema = true;
    }

    //Email
    if(email.val() != ""){
	if( validaFormatoEmail(email)==false){
            validacao_email.html("Preencha este campo corretamente.");
            marcaErro(email);
	    algum_problema = true;
	}
        else{
            marcaAcerto(email);
            validacao_email.html("");
        }
    }
    else{
        validacao_email.html("Preencha este campo corretamente.");
        marcaErro(email);
	algum_problema = true;
    }

  
    // Assunto
    if(assunto.val() != ""){
	if(validaAssunto(assunto.attr('name'))==false){
            marcaErro(assunto);
            validacao_assunto.html("Preencha este campo corretamente.");
	    algum_problema = true;
	}
        else{
            marcaAcerto(assunto);
            validacao_assunto.html("");
        }
    }
    else{
	marcaErro(assunto);
        validacao_assunto.html("Preencha este campo corretamente.");
	algum_problema = true;
    }

     // Mensagem
    if(mensagem.val() != ""){
	if(validaMensagem(mensagem,true)==false){
            marcaErro(mensagem);
            validacao_mensagem.html("Mínimo de 10 caracteres.");
	    algum_problema = true;
	}
        else{
            marcaAcerto(mensagem);
            validacao_mensagem.html("");
        }
    }
    else{
	marcaErro(mensagem);
        validacao_mensagem.html("Preencha este campo corretamente.");
	algum_problema = true;
    }


    if(algum_problema == false){
        return (true);
    }else{
        return (false);
    }

}
//Valida formato do email.
function validaFormatoEmail(email){

    var confirmacao_email    = $("#confirmacao_email");
    var validacao            = $("#validacao_email");

    if(fun_removeEspacos(email.val())!= ""){
        if(fun_validaEmail(email.val())== false){
            validacao.html("Preencha este campo corretamente.");
            marcaErro(email);
            return (false);
        }
        else{
            validacao.html("");
            marcaAcerto(email);
            return (true);
        }
    }
    else{
	validacao.html("");
	marcaAcerto(email);
	return (true);
    }
}
//Valida campo do nome.
function validaNome(nome,valida_campo_vazio){
    if(!validaCampo(nome,3,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
//Valida campo de mensagem.
function validaMensagem(mensagem,valida_campo_vazio){
    if(!validaCampo(mensagem,10,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
//Valida campo de mensagem.
function validaAssunto(select){
    var valor = $("#"+ select +" option:selected").val();
    
    if(valor == 0){
        return false;
    }
    else{
        return (true);
    }
}
//Funcoes para validacao de formulario.
function campoZerado(campo){
    var valor = fun_removeEspacos(campo.val());
    if(valor.length == 0){
        marcaErro(campo);
        return true;
    }
    marcaAcerto(campo);
    return false;
}
function campoTamanhoMinimo(campo,tamanho_minimo,valida_campo_vazio){
    var valor = fun_removeEspacos(campo.val());

    if(valida_campo_vazio == true){
	if(valor.length < tamanho_minimo){
	    marcaErro(campo);
	    return true;
	}
    }
    else{
	if(valor.length != 0){
	    if(valor.length < tamanho_minimo){
		marcaErro(campo);
		return true;
	    }
	}
    }
    marcaAcerto(campo);
    return false;
}
function validaCampo(campo,tamanho_minimo,valida_campo_vazio){
    var algum_problema = false

    if(tamanho_minimo != 0){
	if(campoTamanhoMinimo(campo,tamanho_minimo,valida_campo_vazio)==true){
	    algum_problema = true;
	}
    }

    if(algum_problema == true){
        exibeMensagemErro(campo,"Preencha este campo corretamente.");
    } else {
        exibeMensagemErro(campo,"");
    }

    return ((algum_problema==true)? false : true);
}

function exibeMensagemErro(campo,mensagem){
    var id = '#validacao_' + campo.attr('name');
    $(id).html(mensagem);
}

function marcaErro(campo)
{
    campo.css("border","1px solid red");
    campo.click (function(){
        this.val("");
    });
    campo.keypress (function(){
        campo.css("border","1px solid #ccc");
    });
}
function marcaAcerto(campo)
{
    campo.css("border","1px solid #ccc");
    campo.click(null);
}
function limitadorTamanhoTextArea(id,MaxLength) {
      obj = document.getElementById(id);
      if (MaxLength !=0) {
            if (obj.value.length > MaxLength){
                obj.value = obj.value.substring(0, MaxLength);
                jAlert ("Sua mensagem pode conter no máximo "+MaxLength+" caracteres!","Tamanho mensagem");
            }
      }
}