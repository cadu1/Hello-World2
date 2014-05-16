<div id="tela_escolha_tipo_pessoa">

    <div id="msg_escolha_tipo_pessoa">
        Prezado Usuário,<BR/><BR/>
        A partir desta versão do Meu Dinheiro, passaremos a desenvolver 
        funcionalidades específicas para pessoas físicas e empresas, tornando 
        o aplicativo mais adequado a cada perfil de utilização, por isto, é 
        necessário informar corretamente qual o perfil de utilização mais 
        adequado ao seu usuário.
    </div>
    <table>
        <tr>
            <td>
                <input id="radio-pessoa-fisica" type="radio" name="radio-tipo-pessoa" value="F" />
                <label for="radio-pessoa-fisica">Perfil Pessoal</label>
            </td>
            <td>
                <input id="radio-pessoa-juridica" type="radio" name="radio-tipo-pessoa" value="J" />
                <label for="radio-pessoa-juridica">Perfil Empresarial</label>
            </td>
        </tr>
    </table>
</div>
<div id="popup_panel"  class="popup_botoes_meu_dinheiro">
    <a id="popup_ok" class="button disabled" >Escolher perfil selecionado</a>
</div>

<script>
    $(function(){
        tratar_tela_setar_tipo_usuario();
    });
</script>

<style>
#msg_escolha_tipo_pessoa{
    text-align: justify; 
    width: 500px;
}
#tela_escolha_tipo_pessoa table{
    border-spacing: 0;
    border: 1px solid #9CB9C9;
    width: 500px;
    margin-top: 10px;
}
#tela_escolha_tipo_pessoa table td{
    background: #E2EAEF;
    padding: 5px;
    text-align: center;
}
#tela_escolha_tipo_pessoa table td input{
    margin: 0;
    vertical-align: top;
}
#tela_escolha_tipo_pessoa table td label{
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    font-family: Arial;
}
#tela_escolha_tipo_pessoa table td label:hover {
    text-decoration: underline;
}
</style>
    