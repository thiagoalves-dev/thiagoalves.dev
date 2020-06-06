---
extends: _layouts.post
section: content

date: 2020-06-06
author: Thiago Alves
title: Estrutura de código
description:  
keywords:  
---

Dias atrás, eu conversava com um amigo, iniciante na programação. Num determinado momento, ele perguntou qual eu acreditava ser a maior diferença entre um programador júnior e um sênior, do ponto de vista prático.

Relembrando a minha trajetória, a resposta veio fácil: com o passar dos anos, pensamos mais e escrevemos menos. Certamente existem várias e, sinceramente, nem sei se essa é realmente a maior. A questão é que essa conversa fez eu refletir bastante sobre como a minha forma de trabalhar mudou com o tempo, felizmente.

Atualmente, acredito que o momento mais complexo é sempre o início de um projeto. A hora de escolher o que e como será usado, como organizar, que estrutura seguir, diretrizes, padrões.

Coincidentemente, essa semana, deparei com um artigo (referenciado no rodapé) que levanta 5 pontos importantes sobre estruturação de código. Então, resolvi analisar esses pontos e dar a minha versão sobre eles.

### Desenho da aplicação

Antes de começar as escrever as suas primeiras linhas de código, é recomendado que inicie o seu projeto desenhando algumas questões importantes do mesmo.

Nos últimos anos, pude notar que gastar algumas horas nessa fase, pode fazer uma grande diferença lá na frente. Não precisa de nada muito elaborado, pode ser feito até no papel.

Você pode trabalhar com UML (_Unified Modeling Language_), fluxogramas, modelagem de dados (MER). Existem outros, mas considero que esses são os mais importantes e é perfeitamente possível trabalhar com eles em conjunto. A ideia é entender os comportamentos que o sistema deve ter, identificar etapas e possíveis pontos de colisão. Além de definir as entidades do sistema, que dados vão possuir e como eles serão salvos no banco.

# CONTINUA DAQUI

Nessa fase, quanto mais dúvidas surgirem e mais elas forem discutidas, melhor. É importante que a equipe participe das decisões, para que todos sigam o combinado na hora de implementar.

### Convenções de código

O primeiro passo para se construir um ambiente saudável entre programadores que compartilham o mesmo código, é definir como ele deve ser escrito.

Você que trabalha sozinho e tá pensando que isso não faz parte da sua realidade, não se engane, você vai evoluir com o tempo, mas possivelmente terá que fazer manutenção do código atual, no futuro.

Atualmente, esse trabalho está bastante facilitado. A maioria das linguagens que eu conheço possuem suas variadas convenções. Além disso, existem ferramentas capazes de fazer uma validação do código para identificar se ele estão seguindo as regras corretamente. Os próprios editores atuais, conseguem se integrar com essas ferramentas e validar o código enquanto ele ainda está sendo escrito.

Regras para funções e classes

Esse é sem dúvida um dos assuntos que eu mais gosto na programação. Escrever código limpo tem sido uma das minhas obsessões nos últimos anos. Para isso, isso está diretamente ligado a escrever pouco. Funções e classes pequenas, focadas num único objetivo.

Tempos atrás eu escrevi aqui sobre o princípio da responsabilidade única do SOLID. Também já falei sobre os princípios do aberto/fechado e da substituição de Liskov. Vale a pena conferir!

Basicamente, o que quero dizer é que: quanto mais lógica suas funções e classes possuírem, mais problemas elas podem causar e mais difícil será de mantê-las. Uma função que faz uma única coisa, que possui parâmetro e retorno tipificados, dificilmente de dará manutenção mais de uma vez.

Design Patterns

Se você não está familiarizado com o assunto, design patterns nada mais são do que formas generalizadas de resolver problemas recorrentes. Não se trata de um framework, por exemplo. Estamos falando de abstração de problemas e desafios específicos. Por exemplo, usar uma classe que reúne uma série de funções de outras classes que tem um assunto em comum usando o Facade Pattern.

Quando você estiver com problemas para estruturar uma parte da lógica, procure por algum padrão que se encaixe na sua necessidade e aplique-o. Na programação, muitas vezes a melhor saída é simplesmente seguir o caminho que alguém já percorreu antes ao invés de tentar criar algo mirabolante. Isso também contribui para o compartilhamento do conteúdo entre a equipe, uma vez que o programador entende que padrão foi seguido, entender o código fica mais fácil.

Testes automatizados

Pode parecer estranho que haja um tópico como esse num artigo que fala sobre estruturação de código, mas já vou explicar.

Até agora, só falamos em como fazer. Então, chegou a hora de falar sobre como validar o que foi feito. Os testes vão nos ajudar a garantir, de alguma forma, que os quatro tópicos anteriores estão sendo aplicados. Atualmente, existe teste para praticamente todas as áreas do sistema. Como dito anteriormente, até a escrita do código é testável.

Uma das formas de saber se uma função foi bem escrita, é o quão simples ela é de ser testada. Se está difícil de escrever os testes sobre um trecho de código, provavelmente ele merece uma refatoração ou reestruturação. Principalmente os teste unitários.

Ainda vou me aprofundar bem mais nesse assunto aqui no blog mas, inicialmente, eu diria que se você não escreve testes nas sua aplicação, nem deveria estudar sobre padrões e boas práticas, pois entendo que seja uma perda de tempo.

Concluindo

As pessoas tendem a usar a falta de tempo para isso, quando na verdade estamos falando de páticas que tendem a acelerar o tempo de desenvolvimento. Eu posso dizer que nunca ouvi um profissional reclamando por ter desenhado um diagrama sobre o sistema que ia desenvolver.

Se você está numa jornada para se tornar um programador mais completo, dedique tempo para estruturar melhor os seus projetos. 

Nos vemos em breve!

Referência: [Daan, 5 Lessons I’ve Learned on How to Structure Code](https://levelup.gitconnected.com/5-lessons-ive-learned-on-how-to-structure-code-6d662df0fd1f).

