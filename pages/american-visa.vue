<template>
    <div class="text-center">
        <h1>{{ $t('American VISA') }}</h1>

        <div class="content-container">
            <p>
                Eu e a Carol participamos do podcast da Nublu Intercâmbio, agência que nos ajudou com o nosso processo
                de vinda para os Estados Unidos. Eles são especialistas em aprovação de visto americano para turistas e
                estudantes.
            </p>
            <p>
                Nesse episódio nós compartilhamos nossa experiência completa como estudantes, desde a preparação,
                entrevista no consulado, viagem, adaptação, escola, rotina e etc.
            </p>
            <p>
                Caso tenha interesse, acesse os links abaixo e entre em contato com a Nublu Intercâmbio para saber mais.
            </p>
        </div>
        <div class="my-12">
            <a href="https://internacionalize-se.com.br/nublu/solicite-seu-visto-de-estudante/?utm_source=geral&utm_medium=embaixador&utm_campaign=nublu&utm_id=thiagoalves"
               class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent hover:no-underline rounded block sm:inline-block sm:mr-2"
               target="_blank">
                Quero visto de estudante
            </a>
            <a href="https://internacionalize-se.com.br/vistopronto/?utm_source=geral&utm_medium=embaixador&utm_campaign=vistopronto&utm_id=thiagoalves"
               class="bg-transparent hover:bg-blue-400 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent hover:no-underline rounded block mt-4 sm:inline-block sm:ml-2 sm:mt-0"
               target="_blank">
                Quero visto de turista
            </a>
        </div>
        <div class="content-container">
            <p>Assista ao episódio completo:</p>
        </div>
        <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/FhDM5VBF1Ns?si=jUHoPxdRro7D5OWY"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    title="Vale a pena MORAR EM UTAH com VISTO DE ESTUDANTE F1? (Salt Lake City)"
                    allowfullscreen></iframe>
        </div>

        <p class="text-gray-700 text-sm text-center mt-10">
            Compartilhe suas dúvidas nos comentários outro entre em contato comigo diretamente pelo instagram.
        </p>

        <PostComments/>
    </div>
</template>

<style lang="scss" scoped>
.video-wrapper {
    aspect-ratio: 16 / 9;

    iframe {
        width: 100%;
        height: 100%;
    }
}
</style>
