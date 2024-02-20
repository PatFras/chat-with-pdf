<script>
  import { Input, Label, Spinner } from "flowbite-svelte";
  import { appStatusInfo, setAppStatusError } from "@/store";

  const { id, url, pages } = $appStatusInfo;

  let answer = "";
  let loading = false;

  const numOfImagesToShow = Math.min(pages, 4);

  const images = Array.from({ length: numOfImagesToShow }, (_, i) => {
    const page = i + 1;
    return url
      .replace("/upload/", `/upload/w_400,h_540,c_fill,pg_${page}/`)
      .replace(".pdf", ".jpg");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    loading = true;
    answer = "";

    const question = event.target.question.value;
    const searchParams = new URLSearchParams();
    searchParams.append("id", id);
    searchParams.append("question", question);

    try {
      const eventSource = new EventSource(
        `https://livepdf.vercel.app/api/ask?${searchParams.toString()}`
      );

      eventSource.onmessage = (event) => {
        loading = false;
        const rawData = event.data;
        const incomingData =
          typeof rawData === "string" ? JSON.parse(rawData) : null;

        if (incomingData === "__END__") {
          eventSource.close();
          return;
        } else if (incomingData) {
          answer += incomingData;
        }
      };
    } catch (e) {
      setAppStatusError();
      console.error("Error durante la comunicación con el servidor:", e);
    } finally {
      loading = false;
    }
  };
</script>

<div class="grid grid-cols-4 gap-2">
  {#each images as image}
    <img
      src={image}
      alt="PDF page"
      class="rounded w-full h-auto aspect-[400/540]"
    />
  {/each}
</div>

<form class="mt-8" on:submit={handleSubmit}>
  <Label for="question" class="block mb-2 text-white">Pregunta aquí</Label>
  <Input id="question" required placeholder=""></Input>
</form>

{#if loading}
  <div class="mt-10 flex justify-center items-center flex-col gap-y-2">
    <Spinner />
    <p class="opacity-75">Esperando respuesta...</p>
  </div>
{/if}

{#if answer}
  <div class="mt-8 mb-8">
    <p class="text-white font-light text-pretty text-xl">{answer}</p>
  </div>
{/if}
