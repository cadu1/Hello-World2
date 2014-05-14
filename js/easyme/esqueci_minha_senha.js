function eventosEsqueciMinhaSenha(){
     
    var ex = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
    $('button').click(function(){
        var v = $('input[name="email"]').val();
        if(!ex.test(v)){
            $('.control-group').addClass('error');
        }else{
            ControladorRetornoEsqueciMinhaSenha("RETORNO_ESQUECI_MINHA_SENHA",v);
        }
    });
    
    $('input[name="email"]').focus(function(){
        $('.control-group').removeClass('error');
    })
}

function eventosEsqueciMinhaSenha2(){
    
    function _eval(field,fn){
        if(!fn.call(field[0])){
            field.closest('.control-group').addClass('error');
            return false;
        }
        return true;
    }
    
    $('form').submit(function(){
        
        if( 
            !_eval($("#senha"),function(){
                return $(this).val().length > 5;
            }) ||
            !_eval($("#confirmacao_senha"),function(){
                return $(this).val() == $("#senha").val();
            }) 
        ) return false;
    })
    
    
    $('input').focus(function(){
        $(this).closest('.control-group').removeClass('error');
    })
}
//
//function esqueciMinhaSenha(){
//    ControladorEsqueciMinhaSenha("AUTORIZA_ESQUECI_MINHA_SENHA");
//}
//
//function retornoEsqueciMinhaSenha(){
//    var email = $("#email");
//    ControladorRetornoEsqueciMinhaSenha("RETORNO_ESQUECI_MINHA_SENHA",email.val());
//}
//function validaEsqueciMinhaSenha1(){
//
//  var email = $("#email");
//  var retorno = "false";
//
//   if(email.val() != ""){
//        if(fun_validaEmail(email.val())==true){
//            exibeMensagemErro(email,"");
//            marcaAcerto(email);
//            retorno = "true";
//        }
//        else{
//            exibeMensagemErro(email,"Preencha este campo corretamente.");
//            marcaErro(email);
//        }
//   }
//   else{
//       exibeMensagemErro(email,"Preencha este campo corretamente.");
//       marcaErro(email);
//   }
//
//   if(retorno == "true"){
//       retornoEsqueciMinhaSenha();
//       return(true);
//   }
//   else{
//        return(false);
//   }
//}
//
//function validaEsqueciMinhaSenha2(){
//
//    var algum_problema = false;
//
//    var senha               = $("#senha");
//    var confirmacao_senha   = $("#confirmacao_senha");
//    var email               = $('#email');
//
//    if(senha.val() != ""){
//	if(verificaTamanhoSenha(senha)== false){
//	    algum_problema = true;
//	}
//    }
//    else{
//	marcaErro(senha);
//	var validacao_senha = $("#validacao_senha");
//        validacao_senha.html("Preencha este campo corretamente.");
//	algum_problema = true;
//    }
//
//    if(confirmacao_senha.val() != ""){
//	if( verificaIgualdadeSenhas(senha,confirmacao_senha)== false){
//	    algum_problema = true;
//	}
//    }
//    else{
//	marcaErro(confirmacao_senha);
//	var validacao_confirmacao_senha = $("#validacao_confirmacao_senha");
//        validacao_confirmacao_senha.html("Preencha este campo corretamente.");
//	algum_problema = true;
//    }
//
//    if(email.val() == ""){
//        algum_problema = true;
//    }
//
//    if(algum_problema == true){
//        return (false);
//    }else{
//        return (true);
//    }
//}
//
////Valida formato de email.
//function validaEmail(email){
//   if(email.val() != ""){
//        if(fun_validaEmail(email.val())==true){
//            exibeMensagemErro(email,"");
//            marcaAcerto(email);
//            return(true);
//        }
//        else{
//            exibeMensagemErro(email,"Preencha este campo corretamente.");
//            marcaErro(email);
//            return (false);
//        }
//   }
//   else{
//       exibeMensagemErro(email,"");
//       marcaAcerto(email);
//       return(true);
//   }
//}
//
////Verifica quantidade de caracteres da senha.
//function verificaTamanhoSenha(senha){
//    var confirmacao_senha = $("#confirmacao_senha");
//    var validacao         = $("#validacao_senha");
//    var valor             = senha.val();
//
//    var tam = valor.length;
//
//    if(valor != ""){
//        if(tam < 6){
//            marcaErro(senha);
//            validacao.html("Preencha este campo corretamente.");
//            return(false);
//        }
//        else{
//            marcaAcerto(senha);
//            validacao.html("");
//
//            if(confirmacao_senha.val()!=""){
//                verificaIgualdadeSenhas(senha,confirmacao_senha);
//            }
//            return(true);
//        }
//    }
//    else{
//	marcaAcerto(senha);
//        validacao.html("");
//	return (true);
//    }
//}
////Verifica se os campos de senha sao iguais.
//function verificaIgualdadeSenhas(senha,confirmacao_senha){
//
//    var validacao  = $("#validacao_confirmacao_senha");
//
//    if(confirmacao_senha.val() != "" ){
//        if(senha.val() != confirmacao_senha.val()){
//            marcaErro(confirmacao_senha);
//            validacao.html("Senha não confere.");
//            return (false);
//        }
//        else{
//            marcaAcerto(confirmacao_senha);
//            validacao.html("");
//            return (true);
//        }
//    }
//    else{
//	marcaAcerto(confirmacao_senha);
//	validacao.html("");
//	return (true);
//    }
//}
//
////Funcoes para validacao de formulario.
//function exibeMensagemErro(campo,mensagem){
//    var id = '#validacao_' + campo.attr('name');
//    $(id).html(mensagem);
//}
//
//function marcaErro(campo)
//{
//    campo.css("border","1px solid red");
//    campo.click (function(){
//        this.val("");
//    });
//    campo.keypress (function(){
//        campo.css("border","1px solid #ccc");
//    });
//}
//
//function marcaAcerto(campo)
//{
//    campo.css("border","1px solid #ccc");
//    campo.click(null);
//}
//
