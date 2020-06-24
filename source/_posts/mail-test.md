---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-06-26
author: Thiago Alves
title: Mail test
description: 
keywords: 
---

Confesso que ultimamente, tenho estado bastante interessado no assunto Testes Automatizados. No meu dia a dia, a preocupação com a corbertura de testes é cada dia maior.

Dias atrás eu me deparei com uma questão que quebrei a cabeça para testar. Eu precisava enviar um e-mail para um cliente e queria validar se a montagem do e-mail estava acontecendo da forma correta de forma automatizada.

Na documentação do Laravel, eu encontrei uma opção chamada de Fake Mail, mas confesso que não achei muito satisfatório. Posso não ter usado da forma correta, mas o ponto é que eu não consegui simular erros e isso fez com que eu não adotasse a prática indicada pela documentação.

Depois de conversar com um amigo, surgiu uma ideia interessante que me possibilitava testar a Mail Class e a view do e-mail de forma bastante simples, porém completa.

Vou usar uma implementação fictícia abaixo para exemplificar o que eu fiz.

O CENÁRIO

Preciso enviar um e-mail para um cliente com o resumo de um pedido de compra feito no meu site.

Para tal, implementei uma Mail Class que recebe o ID do pedido que vou mandar as informações. No meu sistema, os pedidos são representados classe Order que, por sua vez, tem uma ligação direta com a classe User, que representa o cliente que fez o pedido.

A view do email foi montada usando markdown, mas o mesmo teste poder ser feito se ela estivesse em HTML.

Seguem abaixo as classes do cenário descritos:

// User Model

// Order Model

// Mail Class

// Markdown View

O TESTE

Como mensionado na introdução, meu objetivo é testar a classe Mail e a montagem da view, para me certificar de que não estão ocorrendo erros nessa lógica, mesmo que mudanças aconteçam no código ao longo do tempo.

Para isso, o primeiro passo é gerar dados falsos para eu usar no teste. Fiz isso usando as famosas factories.

// User Factory

// Order Factory

Para validar o que eu quero, vou usar dois testes apenas. Um que vai checar o método build do Mail e outro que valida a renderização do corpo do e-mail. Segue abaixo.

// Test Code

Simples, né? Apenas isso é o suficiente para verificar se o email está sendo montado corretamente. 

Veja o resultado.

// Print of test success

Agora se eu remover o relacionamento do pedido com o usuário, o teste tem que quebrar.

// Model Order without user relationship

Resultado

// Print of test fail

Este teste não inclui validar o envio do e-mail, uma vez que isso geralmente depende de um server externo. O foco é realmente testar a sua montagem e não uma integração SMTP. 

CONCLUINDO

Envio de e-mails tende a ser uma das partes mais obscuras de um sistema e também uma das mais chatas de se testar. 

Eu já perdi a conta de quantas vezes fiz modificações num código que acabou afetando o envio de um e-mail que, muitas vezes, nem tinha relação direta com o que foi alterado.

O código acima está disponível no meu repositório do github para que possa copiar. Espero que ajude.

Nos vemos em breve!