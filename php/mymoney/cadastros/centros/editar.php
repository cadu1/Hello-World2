<table class="cadastro-edicao">
    <tr>
        <td><span class="cad-label">Tipo</span></td>
        <td class="cadastro-edicao-dados">
            <input id="radio_novo_centro_despesa" checked type="radio" name="tipo_novo_centro" value="CUSTO" />
                <label for="radio_novo_centro_despesa">Custo</label>
            <input id="radio_novo_centro_receita"  type="radio" name="tipo_novo_centro" value="LUCRO" />
                <label for="radio_novo_centro_receita">Lucro</label>
            <input id="radio_novo_centro_ambos"  type="radio" name="tipo_novo_centro" value="AMBOS" />
                <label for="radio_novo_centro_ambos">Ambos</label>
        </td>
    </tr>
    <tr>
        <td >
            <span class="cad-label">Nome</span>
        </td>
        <td class="cadastro-edicao-dados">
            <input id="input_nome_novo_centro" type="text" maxlength="100" value=""/>
        </td>
    </tr>
</table>
