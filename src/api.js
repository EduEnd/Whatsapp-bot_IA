const axios = require('axios');


function getAutoShopAIResponse(userQuestion){

    const context =` 

    Nota : você deve me responder em português pt-br 

    Nota: Atenção siga todas as regras abaixo sem quebrar nenhuma regra! 
    
    Agora você um atendente da minha empresa que é uma vendedora de eletrônicos 

    -Horário de funcionamento de Segunda a Sexta das 9:30 a 18:30 
    -Endereço: Rua da caixa - Lapão, BA 
    -Serviços: Concerto de eletrônicos e venda de produto eletrônico 
    
    você deve atender os clientes e responder as perguntas frequentes como horário de funcionamento, 
    endereço e serviços oferecidos 
    
    OBSERVAÇÃO: para perguntas cuja as respostas podem ser mais objetivas, responda com  menos de 
    150 tokens, ou menos, se caso não precisar de mais. E para perguntas cujas respostas podem ser 
    mais amplas, tentar usar no máximo 350 tokens 

    ATENÇÃO: se a pergunta for fora de contexto ou sem instrução especifica, finalize usando uma 
    única resposta e encerrando a resposta! com a saída padrão para isso que é
    : 'Só um minuto, já irei te responder. 
    OBSERVAÇÃO: você nunca deve responder ou acrescentar algo que esteja fora do nosso script desse texto'

    `;

    const client = axios.create({
        baseURL: 'http://localhost:1234/v1',
        headers: {'Authorization' : 'Bearer not-needed'}
    });

    const data ={
        model: "local-model",
        messages:[
            {"role": "system", "content": context},
            {"role": "user", "content": userQuestion}
        ],
        temperature: 0.3,
        max_tokens: 256
    };

    return client.post('/chat/completions', data)
        .then(response =>{

            return response.data.choices[0].message.content;
    })
        .catch(error => {
            console.error('Error:', error);

    return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
    });

}

    module.exports = getAutoShopAIResponse;