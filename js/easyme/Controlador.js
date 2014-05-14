
var appAutenticacao = "easyme";

function ControladorEasyme()
{
    var callback = arguments[arguments.length-1];
    var url = obtemUrlAjax("easyme");
    var args = arguments;

    get(url,args,function(r)
    {
        if(typeof(callback) == "function") callback(r);
    });
}


function ControladorEasymeSilenciosoCallback()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);
    req = obtemArgumentos(arguments);

    var callback = arguments[arguments.length-1];
    Ajax("GET",url_requisicao,true,null,
        function(r){
            callback(r);
        }
    );
}

function ControladorEasymeSync()
{
    var callback = arguments[arguments.length-1];
    var url = obtemUrlAjax("easyme");
    var args = arguments;

    getSync(url,args,function(r)
    {
        if(typeof(callback) == "function") callback(r);
    });

}

/* LOGIN E CADASTRO */

function ControladorAutorizaCadastro()
{
//    var req = "";
//    var url_requisicao = obtemUrlAjax(appAutenticacao);
//
//    url_requisicao += criaQueryString(arguments);
//
//    Ajax("GET",url_requisicao,true,null,
//        function(){
//            document.forms["form_cadastro_usuario"].submit();
//        }
//    );
    ControladorEasyme(arguments,function(){
        document.forms["form_cadastro_usuario"].submit();
    })
}

function ControladorAutenticacaoUsuario()
{ 
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    var origem_login = arguments[1];

    Ajax("GET",url_requisicao,true,null,
        function(){
            var continuar_contectado = $('input[name=continuar_conectado]').is(':checked');
            ControladorAutenticacaoContinuarConectado("CONTINUAR_CONECTADO",continuar_contectado,origem_login);
        }
    );
}

function ControladorAutenticacaoContinuarConectado()
{

    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    var origem_login = arguments[2];

    Ajax("GET",url_requisicao,true,null,
        function(retorno){

            if(retorno == "CONTINUAR_CONECTADO"){
                document.getElementById("form_autenticacao_usuario").action = "./visao/php/easyme/autenticacaoEasyme?continuar_conectado=true&origem_login="+origem_login;
            }
            else{
                document.getElementById("form_autenticacao_usuario").action = "./visao/php/easyme/autenticacaoEasyme?origem_login="+origem_login;
            }
            document.forms["form_autenticacao_usuario"].submit();
        }
    );
}

function ControladorAutenticacaoSalvarCookieContinuarConectado()
{  
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(valor){

           valor = valor.split(",");
           var cookie_conexao = valor[0];
           var usuario_email  = valor[1];

            if(valor != 'NAO_CONTINUAR_CONECTADO'){
                fun_setCookie('EASYME_CONEXAO', cookie_conexao, 360);
                fun_setCookie('EASYME_LOGIN', usuario_email, 360);
            }
        }
    );
}

function ControladorAutenticacaoVerificarCookieContinuarConectado()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(aplicativo){
            if(aplicativo != "EASYME_CONEXAO_INVALIDA"){
//                location.href = "./"+aplicativo;
                location.href = "./visao/php/easyme/carregarConfiguracoes.php";
            }
        }
    );
}

function ControladorEsqueciMinhaSenha()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(){
           location.href = "./esqueciMinhaSenha";
        }
    );
}

function ControladorRetornoEsqueciMinhaSenha()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,function(retorno){
        if(retorno == "USUARIO_NULL"){
            jAlert("Não foi possível encontrar o email informado.","Email não encontrado");
        }
        else{
            if(retorno=="CADASTRO_CANCELADO"){
                 location.href = "./solicitarReativacaoConta";
            }
            else{
               location.href = "./retornoEsqueciMinhaSenha";
            }
        }
    });
}

/* CONFIGURACOES */

function ControladorAtualizarConfiguracoesUsuarioPessoais()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){
                set_invisivel_config_pessoais_easyme();
                ControladorTelaConfiguracoesUsuarioPessoais('CONFIGURACOES_TELA_USUARIO_PESSOAIS_INICIO');
                set_invisivel_config_pessoais_easyme();
                jAlert(
                "Suas informações foram alteradas com sucesso."
                ,"Alteração de informações pessoais");
            }
        }
    );
}

function ControladorTelaConfiguracoesUsuarioPessoais(){

    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,"pessoais_inicio",
        function(){
            ControladorTelaConfiguracoesUsuarioTopoPagina('CONFIGURACOES_TELA_USUARIO_TOPO_PAGINA');
        }
    );
}

function ControladorTelaConfiguracoesUsuarioTopoPagina(){

    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            var topo_usuario_nome = $("#topo_usuario_nome");
            topo_usuario_nome.html(retorno);
        }
    );
}

function ControladorAtualizarConfiguracoesUsuarioEmail()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "EMAIL_INVALIDO"){
                set_invisivel_config_email_easyme();
                jAlert("Este email já esta cadastrado!","Email inválido");
            }
            if(retorno == "true"){
                set_invisivel_config_email_easyme();
                jAlert(
                "Uma mensagem foi enviada para o seu novo endereço de email.\n\
                Esta mensagem contém um link para confirmação da sua alteração.\n\
                Acesse agora o seu novo email para confirmar sua alteração."
                ,"Alteração de email");
                ControladorTelaConfiguracoesUsuarioEmail('CONFIGURACOES_TELA_USUARIO_EMAIL_INICIO');
            }
            if(retorno == "EMAIL_REPETIDO"){
                set_invisivel_config_email_easyme();
                jAlert(
                "O email informado ja é o seu email atual."
                ,"Alteração de email");
                ControladorTelaConfiguracoesUsuarioEmail('CONFIGURACOES_TELA_USUARIO_EMAIL_INICIO');
            }
        }
    );
}

function ControladorValidarSenhaConfiguracoesUsuarioSenha()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){

                 var senha = $("#senha");

                 ControladorAtualizarConfiguracoesUsuarioSenha("ATUALIZAR_CONFIGURACOES_USUARIO_SENHA",senha.val());
            }
            else{
                var senha_alterar               = $("#senha_alterar");
                var senha_atual                 = senha_alterar.find (".senha_atual");
                var validacao_senha_atual       = senha_alterar.find(".validacao_senha_atual");

                marcaErro(senha_atual);
                validacao_senha_atual.html("Preencha este campo corretamente.");
                jAlert("Senha atual informada é inválida.","Senha inválida");
            }
        }
    );
}

function ControladorSalvarConfiguracoesUsuarioCancelarAlteracaoEmail()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(){
            ControladorTelaConfiguracoesUsuarioEmail('CONFIGURACOES_TELA_USUARIO_EMAIL_INICIO');
        }
    );
}

function ControladorTelaConfiguracoesUsuarioEmail(){

    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,"email_inicio",
        function(){
        }
    );
}

function ControladorAtualizarConfiguracoesUsuarioSenha()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){
                set_invisivel_config_senha_easyme();
                jAlert("Sua senha foi alterada com sucesso.","Alteração concluída");
            }
        }
    );
}

function ControladorValidarSenhaConfiguracoesCancelarConta()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    var motivo = arguments[2];

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){

                 var email = $("#email");
                 if(confirm("Tem certeza que deseja cancelar sua conta Easyme?")){
                      ControladorAtualizarConfiguracoesCancelarConta("ATUALIZAR_CONFIGURACOES_CANCELAR_CONTA",motivo);
                 }
            }
            else{
                var cancelar_conta_alterar  = $("#cancelar_conta_alterar");
                var senha_atual             = cancelar_conta_alterar.find(".senha_atual");
                var validacao_senha_atual   = cancelar_conta_alterar.find(".validacao_senha_atual");
                marcaErro(senha_atual);
                validacao_senha_atual.html("Preencha este campo corretamente.");
                jAlert("Senha atual informada é inválida.","Senha inválida");
            }
        }
    );
}

function ControladorValidarSenhaConfiguracoesUsuarioEmail()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){

                 var email = $("#email");

                 ControladorAtualizarConfiguracoesUsuarioEmail("ATUALIZAR_CONFIGURACOES_USUARIO_EMAIL",email.val());
            }
            else{
                var email_alterar           = $("#email_alterar");
                var senha_atual             = email_alterar.find(".senha_atual");
                var validacao_senha_atual   =  email_alterar.find(".validacao_senha_atual");
                marcaErro(senha_atual);
                validacao_senha_atual.html("Preencha este campo corretamente.");
                jAlert("Senha atual informada é inválida.","Senha inválida");
            }
        }
    );
}

function ControladorAtualizarConfiguracoesCancelarConta()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){
               jAlert("Sua conta Easyme foi cancelada com sucesso.","Conta cancelada",
               function(){
                    location.href = "index";
                });
            }
            if(retorno == "false"){
                jAlert("Não foi possível cancelar sua conta.\nTente Novamente.","Erro no cancelamento")
            }
            set_invisivel_config_cancelar_conta_easyme();
        }
    );
}

function ControladorCarregaTelaConfiguracoes(){
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);
    Ajax("GET",url_requisicao,true,"configuracoes",null);
}

function ControladorCarregaTelaConfiguracoesPessoais(){
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,"pessoais_alterar",
        function(){
        }
    );
}

function ControladorAtualizarConfiguracoesReativarConta()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);

    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){
               jAlert("Sua conta Easyme foi reativada com sucesso.","Conta reativada",
               function(){
                    location.href = "index";
                });
            }
            if(retorno == "false"){
                jAlert("Não foi possível reativar sua conta.\nTente Novamente.","Erro ao reativar")
            }
            set_invisivel_config_cancelar_conta_easyme();
        }
    );
}

function ControladorAtualizarConfiguracoesIniciarReativacaoConta()
{
    var req = "";
    var url_requisicao = obtemUrlAjax(appAutenticacao);
    url_requisicao += criaQueryString(arguments);

    Ajax("GET",url_requisicao,true,null,
        function(retorno){
            if(retorno == "true"){
               jAlert("Uma mensagem para reativação da sua conta foi enviada com sucesso para o seu email de login.","Reativar conta Easyme",
               function(){
                    location.href = ".";
                });
            }
            else{
                jAlert("Não foi possível enviar mensagem para reativação da sua conta.\nTente Novamente.","Erro ao enviar mensagem")
            }
        }
    );
}





