(function(window,$){    
       
    var Cadastro = function(){};
   
    var fn = Cadastro.prototype;
    
    window.Cadastro = new Cadastro;
    
    $(function(){
        var signupButton = $("#submit-signup") ,
            originalText = signupButton .html();
        
        var form = $('#form-cadastro').form({
            action : 'php/easyme/cadastrarUsuario.php',
            events : {
                submit : function(e){
                    var f = this;
                    if(form.evalAll()){
                        
                        signupButton.html('Aguarde..').addClass('disabled');
                        
                        /*Campos do formulario {name: valor}*/
                        var fields = form.getPost();
                        
                        /*Seta uma chave de validacao que eh comparada no server*/
                        fields.xfndtbasas = '&d8#TR8yR@jds';
                        $.post( form.config.action , fields , function(r){
                            r = r.trim();
                            switch(r){
                                case 'INDISPONIVEL': alert('O endereço de email escolhido está indisponível.','Endereço de email indisponível'); break;
                                case 'INVALIDO': alert('O endereço de email escolhido é inválido.','Endereço de email inválido'); break;
                                case 'MAX': alert('Este endereço de email já foi utilizado mais de 1 vez. Entre em contato com o suporte','Endereço de email indisponível'); break;
                                case 'CADASTRONAUTH'   : location.href = 'retornoValidacaoCadastro'; return true;
                                case 'CADASTROAUTH'    : location.href = 'php/easyme/carregarConfiguracoes'; return true;
                                default: alert('Falha ao cadastrar. Por favor, tente novamente ou entre em contato.'); break;
                            }
                            signupButton.html(originalText).removeClass('disabled');
                            /*Recadastrando evento de submit caso tenha ocorrido falha*/
                            f.one('submit',e);
                        });
                        /*Desabilitando evento de submit*/
                        return true;
                    }else{
                        alert('Preencha os campos marcados corretamente.');
                    }
                    return false;
                }
            }
        }).data('jForm'), fields = form.fields;
        
        var nomeusr = $(fields['nome-usuario']);
        
        $(fields['nome-fantasia']).add(fields['nome-completo']).keyup(function(){
             var v = $(this).val();
             v = v.split(" ")[0].trim();
             
             var a = nomeusr.val().trim();
              
             if(a != v || !a.length){
                 nomeusr.val(v);
             }
         });
        
        var email_cache = {};
        $(fields['email']).blur(function(){
            var f = this;
            /*Esperando validar*/
            setTimeout(function(){
                /*Se campo esta invalido, nem continua*/
                if($(f).hasClass('invalid-input')) return;
                var v = f.value.trim();
                if(email_cache[v] === undefined){
                    ControladorEasyme('VALIDA_EMAIL_CADASTRO',v,function(r){
                        
//                        console.log(r);
                        
                        if(r != 'DISPONIVEL'){
                            var msg;
                            if(r == 'INDISPONIVEL') msg = 'Email indisponível';
                            else if(r == 'INVALIDO') msg = 'Email inválido';
                            else if(r == 'MAX') msg = 'Este email já foi utilizado mais de 1 vez. Entre em contato com o suporte.';
                            
                            /*Se email ja existe*/
                            form.error.call(f,'',false,msg);
                            /*Cache*/
                            email_cache[v] = {
                                r : r,
                                m : msg
                            };
                        }
                    });
                }else{
                    form.error.call(f,'',email_cache[v].r == 'DISPONIVEL',email_cache[v].m);
                }
                
            },10);
        });
        
//        var gw = function(){window.open('https://accounts.google.com/o/oauth2/auth?client_id=507482723610.apps.googleusercontent.com&redirect_uri=http://www.meudinheiroweb.com.br/php/easyme/autenticacaoGoogle.php&response_type=code&approval_prompt=force&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_type=offline','Login','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=685,height=520');},
//            fw = function(){window.open('./php/easyme/autenticacaoFacebook','Login','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=685,height=520');};
//                
//        var g = $("#load-google").on('click',gw),
//            f = $("#load-fb").on('click',fw);
//        
//        if(g.hasClass('load')) gw();
//        else if(f.hasClass('load')) fw();
        
    });
    
})(this,jQuery);