import { Row, Col, Divider } from 'antd';
import { Button } from 'antd';
import React, {useState} from "react"; 
import '../App.css';
import {PlusSquareOutlined, CheckSquareOutlined, CloseSquareOutlined, FormOutlined} from '@ant-design/icons';

export default function List() {
    //
    const [texto, settexto] = useState(" "); // para inserção do texto no input
    const [todos, settodos] = useState([]); //lista de todos os itens
    //const itemlist = {descricao: ' ', todostatus: 'Pendente'};
    const [contador, setcontador] = useState(0);

    //adiciona com id contador (para evitar id repetido após o splice) e status padrão (pendente)
    function adicionaritem(texto) {
        const copia = Array.from(todos);
        copia.push({ id: contador , value: texto, todostatus: 'Pendente' });
        settodos(copia);  
        setcontador(contador+1); 
    }  

    //uso da função splice para retirar o objeto no index objindex. 1 é a quantidade (1 elemento da lista)
    function deletaritem(localizacao){
        const copia = Array.from(todos);
        const objIndex = copia.findIndex((obj => obj.id === localizacao));
        copia.splice(objIndex,1); 
        settodos(copia); 
    } 

    //conclui a atividade mudando o status do obj para concluido. copia feita pois não dá para mudar direto no state
    function concluir(localizacao){
        const copia = Array.from(todos);
        const objIndex = copia.findIndex((obj => obj.id === localizacao));
        //atualizando status
        copia[objIndex].todostatus = "Concluido"; 
        settodos(copia);
    }

    //funcao para reverter a conclusao de tarefa através da mudança para status pendente.
    function voltar(localizacao){
        const copia = Array.from(todos);
        const objIndex = copia.findIndex((obj => obj.id === localizacao));
        //atualizando status
        copia[objIndex].todostatus = "Pendente"; 
        settodos(copia);
    } 
 
    //alert pedindo confirmação que chama a função de deletar item.
    function confirmarexclusao(param){ 
        var r= window.confirm("Tem certeza que deseja apagar?");
        if (r===true){
            deletaritem(param);
        }
      //  else{
        //    "Você pressionou Cancelar!";
        //}
       // document.getElementById("demo").innerHTML=x;
    }


    //para filtrar e separar itens pendentes de concluídos:
    let filterResultpendente = todos.filter(u => 
        u.todostatus == 'Pendente'); 

    let filterResultconcluido = todos.filter(u => 
        u.todostatus == 'Concluido'); 

    return (
        <>
            <div className="todo-wrapper">
                <h1>To Do List</h1>
                <input id="tarefa" type="text" className="input-wrapper" placeholder="Insira uma tarefa" onChange={e => settexto(e.target.value)} />

                <Button type="primary" shape="round" icon={<PlusSquareOutlined/> } onClick={() => adicionaritem(texto)}>Adicionar</Button>
                
                <Divider />
                {todos.map((todos) => <li className="itens-wrapper" key={todos.id}>{todos.value}
                    <text className="status-wrapper"> {todos.todostatus} </text>
                    
                    {todos.todostatus === 'Pendente' ? // condição para aparecer botão concluir ou voltar de acordo com status
                        <Button type="primary" shape="round" icon={<CheckSquareOutlined />} onClick={() => concluir(todos.id)}>Concluir </Button>
                        :
                        <Button type="primary" shape="round" icon={<CloseSquareOutlined />} onClick={() => voltar(todos.id)}>Voltar, não finalizei</Button>}
                        <Button type="primary" shape="round" icon={<FormOutlined />} onClick={() => confirmarexclusao(todos.id)}>Deletar Item</Button>
                </li>)}
            </div>
        
            <div className="todo-wrapper"> 
                <Row justify="center"> 
                    <Col id="pendentes" span={12}>
                        <h1>Itens Pendentes </h1>  
                        <Divider />
                        {filterResultpendente.map((filterResultpendente) => <li className="itens-wrapper" key={filterResultpendente.id}>{filterResultpendente.value}
                        <text className="status-wrapper"> {filterResultpendente.todostatus} </text>  
                        </li>)}
                    </Col>

                    <Col span={12}>
                        <h1>Itens Concluiídos</h1>
                        <Divider />
                        {filterResultconcluido.map((filterResultconcluido) => <li className="itens-wrapper" key={filterResultconcluido.id}>{filterResultconcluido.value}
                        <text className="status-wrapper"> {filterResultconcluido.todostatus} </text>  
                        </li>)}

                    </Col>
                </Row>
            </div>
        </>
    )
}