<table class="cadastro-edicao">
    <tr>
        <td>
            <span class="cad-label">Nome</span>
        </td>
        <td class="cadastro-edicao-dados">
            <input id="input_nome_nova_categoria" type="text" maxlength="100" value=""/>
        </td>
    </tr>
        <tr>
        <td>
            <span class="cad-label">Tipo</span>
        </td>
        <td class="cadastro-edicao-dados">
            <input id="radio_nova_categoria_despesa" type="radio" name="tipo_nova_categoria" value="DESPESA"  checked/>
                <label for="radio_nova_categoria_despesa">Despesa</label>
            <input id="radio_nova_categoria_receita" type="radio" name="tipo_nova_categoria" value="RECEITA" />
                <label for="radio_nova_categoria_receita">Receita</label>
        </td>
    </tr>
        <tr id="linha_destino_categoria">
        <td>
            <span class="cad-label">Subcategoria de</span>
        </td>
        <td class="cadastro-edicao-dados">
            <select id="select_despesas" >
                <option value="0">Nenhuma</option>
                <option value='968525'>Automóvel</option><option value='968526'>Bem Estar</option><option value='968527'>Educação</option><option value='968528'>Empregados</option><option value='968519'>Familiares Diversas</option><option value='968518'>Impostos e Tarifas</option><option value='968517'>Investimentos</option><option value='968508'>Lazer</option><option value='968509'>Moradia</option><option value='968510'>Outras despesas</option><option value='968511'>Pessoais</option><option value='968512'>Previdência</option><option value='968513'>Saúde</option><option value='968514'>Seguros</option><option value='968515'>Telefonia</option><option value='968516'>Transporte</option><option value='968529'>Vestuário </option>            </select>
            <select id="select_receitas" style='display:none'>
                <option value="0">Nenhuma</option>
                <option value='968521'>Aluguel</option><option value='968520'>Investimentos</option><option value='968522'>Lucros</option><option value='968524'>Outras receitas</option><option value='968523'>Pró-labore</option><option value='968507'>Salário</option>            </select>
        </td>
    </tr>
    </table>
