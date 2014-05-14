function valida_nome_completo(nome,valida_campo_vazio){
    if(!valida_campo(nome,3,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
function valida_nome_fantasia(nome,valida_campo_vazio){
    if(!valida_campo(nome,3,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
function valida_nome_usuario(nome,valida_campo_vazio){
    if(!valida_campo(nome,3,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
function valida_razao_social(razao,valida_campo_vazio){
    if(!valida_campo(razao,3,valida_campo_vazio)){
        return (false);
    }
    else{
        return(true);
    }
}
function verifica_existencia_email_cadastro(email){

    if(valida_formato_email(email) != false){

	if(email.val() != ""){
            if($('#confirmacao_email').val()!= undefined){
                return (verifica_igualdade_emails(email,$('#confirmacao_email')));
            }
            else{
                return(true);
            }
	}
    }
    return (false);
}
function valida_formato_email(email){

    var confirmacao_email   = $("#confirmacao_email");
    var validacao           = $("#validacao_email");

    if(fun_removeEspacos(email.val())!= ""){
        if(fun_validaEmail(fun_removeEspacos(email.val()))== false){
            validacao.html("Preencha este campo corretamente.");
            marca_erro(email);
            return (false);
        }
        else{
            validacao.html("");
            marca_acerto(email);
            if(confirmacao_email.get() != ""){
                if(confirmacao_email.val() != ""){
                    verifica_igualdade_emails(email,confirmacao_email);
                }
            }
            return (true);
        }
    }
    else{
	validacao.html("");
	marca_acerto(email);
	return (true);
    }
}
function verifica_igualdade_emails(email,confirmacao_email){

    var validacao = $("#validacao_confirmacao_email");  

    if(confirmacao_email.val() != "" ){             
        if(fun_removeEspacos(email.val()) != fun_removeEspacos(confirmacao_email.val())){ 
            marca_erro(confirmacao_email);
            validacao.html("Email não confere.");
            return (false);
        }
        else{
            marca_acerto(confirmacao_email);
            validacao.html("");
            return (true);
        }
    }
    else{
	marca_acerto(confirmacao_email);
        validacao.html("");
	return (true);
    }
}
function verifica_tamanho_senha(senha){
    var confirmacao_senha = $("#confirmacao_senha");
    var validacao         = $("#validacao_senha");
    var valor             = senha.val();

    var tam = valor.length;

    if(valor != ""){
        if(tam < 6){
            marca_erro(senha);
            validacao.html("Preencha este campo corretamente.");
            return(false);
        }
        else{
            marca_acerto(senha);
            validacao.html("");

            if(confirmacao_senha.val()!=""){
                verifica_igualdade_senhas(senha,confirmacao_senha);
            }
            return(true);
        }
    }
    else{
	marca_acerto(senha);
        validacao.html("");
	return (true);
    }
}
function verifica_igualdade_senhas(senha,confirmacao_senha){

    var validacao  = $("#validacao_confirmacao_senha");

    if(confirmacao_senha.val() != "" ){
        if(senha.val() != confirmacao_senha.val()){
            marca_erro(confirmacao_senha);
            validacao.html("Senha não confere.");
            return (false);
        }
        else{
            marca_acerto(confirmacao_senha);
            validacao.html("");
            return (true);
        }
    }
    else{
	marca_acerto(confirmacao_senha);
	validacao.html("");
	return (true);
    }
}
function valida_estado(id_campo){
    return $("#"+id_campo).val() != "";
}
function valida_origem_usuario(id_campo){
    return $("#"+id_campo).val() != "";
}
function valida_sobre_origem_usuario(origem_usuario,sobre_origem_usuario){
    
    var validacao_sobre_origem_usuario = $("#validacao_sobre_origem_usuario");
    
    if(origem_usuario.val()=="OUTROS" || origem_usuario.val()=="FORUM" || origem_usuario.val()=="ANUNCIOS"){
        if(sobre_origem_usuario.val().length == 0){
            marca_erro(sobre_origem_usuario);
            validacao_sobre_origem_usuario.html("Preencha este campo corretamente.");
            return(false);
        }
        else{
            marca_acerto(sobre_origem_usuario);
            validacao_sobre_origem_usuario.html("");
            return(true);
        }
    }else{
        marca_acerto(sobre_origem_usuario);
        validacao_sobre_origem_usuario.html("");
        return(true);
    }
}

function valida_sexo(id_campo){
    return $("#"+id_campo).val() != "";
}

function valida_setor(id_campo){
    return $("#"+id_campo).val() != "";
}

/** PADRAO **/
function campo_zerado(campo){
    var valor = fun_removeEspacos(campo.val());
    if(valor.length == 0){
        marca_erro(campo);
        return true;
    }
    marca_acerto(campo);
    return false;
}
function campo_tamanho_minimo(campo,tamanho_minimo,valida_campo_vazio){
    var valor = fun_removeEspacos(campo.val());

    if(valida_campo_vazio == true){
	if(valor.length < tamanho_minimo){
	    marca_erro(campo);
	    return true;
	}
    }
    else{
	if(valor.length != 0){
	    if(valor.length < tamanho_minimo){
		marca_erro(campo);
		return true;
	    }
	}
    }
    marca_acerto(campo);
    return false;
}
function valida_campo(campo,tamanho_minimo,valida_campo_vazio){
    var algum_problema = false

    if(tamanho_minimo != 0){
	if(campo_tamanho_minimo(campo,tamanho_minimo,valida_campo_vazio)==true){
	    algum_problema = true;
	}
    }

    if(algum_problema == true){
        exibe_mensagem_erro(campo,"Preencha este campo corretamente.");
    } else {
        exibe_mensagem_erro(campo,"");
    }

    return ((algum_problema==true)? false : true);
}

function exibe_mensagem_erro(campo,mensagem){
    var id = '#validacao_' + campo.attr('name');
    $(id).html(mensagem);
}

function marca_erro(campo)
{
    campo.css("border","1px solid red");
    campo.click (function(){
        this.val("");
    });
    campo.keypress (function(){
        campo.css("border","1px solid #ccc");
    });
}
function marca_acerto(campo)
{
    $(campo).css("border","1px solid #ccc");
    $(campo).click(null);
}

function open_termos_de_uso(){
     window.open('./termosdeuso','Popup','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,menubar=no,width=1024');
}
function open_politicas_de_privacidade(){
    window.open('./politicasdeprivacidade','Popup','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,menubar=no,width=1024');
}

function desabilitaCampo(campo){
    if(campo.val() != ""){
        campo.attr("readonly",true);
        campo.css("background","#E8E8E8");
        campo.css("border","1px solid #ccc");
    }
}

/**EVENTOS**/
function atribui_eventos_telefone(id_campo_telefone)
{
    $("#"+id_campo_telefone)
        .mask("(99) 9999-9999",{placeholder:" "})
        .change(function(){
            if($(this).val() == ""){
            $(this).val("(00) 0000-0000");
            }
    });
}

function atribui_eventos_data(id_campo_data){

    var hoje = get_date("Y-n-j").split("-");
    var ano_menos_cem = new Date(parseFloat(hoje[0])-100,parseFloat(hoje[1])-100,hoje[2]);
        
     $("#"+id_campo_data).datepicker({
        yearRange: "-100:"
    });
    
    var v = $("#"+id_campo_data).val().formatDateMySql();
    var h = get_date("Y-m-d");
    if(datecmp(v,h) <= 0){
        //valido
    }else{
        //invalido
    }
    
}
function valida_cpf(id_campo_cpf){

    var retorno = false;
 
    var cpf = $("#"+id_campo_cpf);
    var validacao_cpf =  $("#validacao_"+id_campo_cpf);

    if(cpf.val().length>0){
        if(isCpf(cpf.val())!=true){
            validacao_cpf.html("Preencha este campo corretamente.");
            marca_erro(cpf);
        }
        else{
            marca_acerto(cpf);
            validacao_cpf.html("");
            retorno = true;
        }
    }
    else{
        marca_acerto(cpf);
        validacao_cpf.html("");
        retorno = true;
    }
    return(retorno);
}

function valida_cnpj(id_campo_cnpj){
    
    var retorno = false;
    
    var cnpj = $("#"+id_campo_cnpj);
    var validacao_cnpj =  $("#validacao_"+id_campo_cnpj);
    
    if(cnpj.length>0){
        if(isCnpj(cnpj.val())!=true){

            validacao_cnpj.html("Preencha este campo corretamente.");
            marca_erro(cnpj);
        }
        else{
            marca_acerto(cnpj);
            validacao_cnpj.html("");
            retorno = true;
        }
    }
    else{
        marca_acerto(cnpj);
        validacao_cnpj.html("");
        retorno = true;
    }
    
    return (retorno);
}

function atribui_eventos_cpf(id_campo_cpf)
{
    $("#"+id_campo_cpf)
        .mask("999.999.999-99",{placeholder:" "})
        .change(function(){
            
         valida_cpf(id_campo_cpf);
    });
}

function atribui_eventos_cnpj(id_campo_cnpj)
{
    $("#"+id_campo_cnpj)
        .mask("99.999.999/9999-99",{placeholder:" "})
        .change(function(){
         
         valida_cnpj(id_campo_cnpj);
         
    });
}

function atribui_eventos_cep(id_campo_cep)
{
    $("#"+id_campo_cep)
        .mask("99999-999",{placeholder:" "});
}

function upload_imagem_juridica()
{
    
    var msg = ( $.browser.msie ) ? "Clique aqui para escolher o arquivo" :"Clique ou arraste o arquivo aqui";
    
    var uploader = new qq.FileUploader({
        
        element: document.getElementById('upload_extrato'),
        action: './visao/php/easyme/fileuploader.php',
        multiple: false,
        allowedExtensions: ['jpg','jpeg','png','gif'],
        sizeLimit: 1000*1024,
        messages: {
            typeError: "Extensão inválida. Extensões permitidas: {extensions} .",
            sizeError: "Arquivo muito grande.Tamanho máximo: {sizeLimit}.",
            onLeave: "Caso você saia desta página, seu upload será cancelado."
        },
        template: '<div class="qq-uploader">' +
            '<div class="qq-upload-drop-area"><span>Solte o arquivo aqui</span></div>' +
            '<div class="qq-upload-button">'+msg+'</div>' +
            '<ul class="qq-upload-list"></ul>' +
            '</div>',

        fileTemplate: '<li>' +
            '<span class="qq-upload-file"></span>' +
            '<span class="qq-upload-spinner"></span>' +
            '<span class="qq-upload-size"></span>' +
            '<a class="qq-upload-cancel" href="#">Cancelar</a>' +
            '<span class="qq-upload-failed-text">Falha ao carregar arquivo</span>' +
        '</li>',

        onSubmit: function(id, file_name)
        {
            if(false)
            {
                return false;
            }
            return true;
        },
        onComplete: function(id, file_name, json)
        {
            
            alert("completo: #" + json.session + "#");
        }
    });
}