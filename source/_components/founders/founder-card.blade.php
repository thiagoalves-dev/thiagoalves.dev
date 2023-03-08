<div class="bg-white rounded-lg p-6 w-full md:flex shadow-lg">
    <img class="h-16 w-16 rounded-full mx-auto md:h-24 md:w-24 md:mx-0 md:mr-6"
         src="/assets/images/founders/{{ $founder->photo }}">
    <div class="text-center md:text-left">
        <h2 class="text-lg mb-1">{{ $founder->name }}</h2>
        <div class="text-gray-600">{{ $founder->profession }}</div>
        <a href="{{ $founder->personal_page }}" class="cube-palette-1 font-medium hover:underline"
           target="{{ $founder->personal_page_target }}">{{ $founder->personal_page_label }}</a>
        <div class="mt-2">
            @if($founder->instagram)
                <a href="https://instagram.com/{{ $founder->instagram }}" target="_blank"
                   class="inline-block opacity-50 hover:opacity-75 mr-3">
                    <img class="h-6" src="/assets/images/social/instagram.png" alt="">
                </a>
            @endif
            <a href="https://linkedin.com/in/{{ $founder->linkedin }}" target="_blank"
               class="inline-block opacity-50 hover:opacity-75 mr-3">
                <img class="h-6" src="/assets/images/social/linkedin.png" alt="">
            </a>
            <a href="https://twitter.com/{{ $founder->twitter }}" target="_blank"
               class="inline-block opacity-50 hover:opacity-75">
                <img class="h-5" src="/assets/images/social/twitter.png" alt="">
            </a>
        </div>
    </div>
</div>
