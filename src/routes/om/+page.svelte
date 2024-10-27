<script>
    import BackButton from '$lib/components/BackButton.svelte';
</script>

<BackButton url={'/'} />

<div class="flex flex-col space-y-10 md:max-w-96">

    <div>
        <h1 class="text-lg" aria-label="This is how mattematte works">
            Slik funker mattematte.no
        </h1>
        <div class="space-y-4">
            <p>
                Du velger selv hvilke tabeller du vil øve på og hvor lenge du vil øve. Du kan velge en eller flere tabeller.
            </p>
            <p>
                Når tiden er ute, får du vite hvor mange spørsmål du rakk å svare på.
            </p>

            <p>
                Appen husker hvilke oppgaver du ofte svarer feil på, og den merker også hvilke oppgaver du tenker lenge på.
            </p>
            <p>
                For at du skal bli skikkelig god spør den deg oftere om disse oppgavene, helt til de sitter og du er blitt knallgod!
            </p>
            <p>
                Det er dette som gjør det supereffektivt å øve med mattematte.no!
            </p>
            <p class="font-semibold">
                Lykke til!
            </p>
        </div>
    </div>

    <div>
        <h1 class="text-lg" aria-label="Privacy">
            Personvern
        </h1>
        <p>
            Her finner du info om <a class="underline hover:text-semibold" href="/personvern">personvern</a>.
        </p>
    </div>

    <div>
        <span>Spørsmål? Kontakt oss på <a class="underline hover:font-semibold" href="mailto:post@1618.no">post@1618.no</a></span>
    </div>
</div>