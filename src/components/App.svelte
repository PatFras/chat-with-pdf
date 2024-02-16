<script>
  import { APP_STATUS, appStatus } from "../store";
  import { Alert } from "flowbite-svelte";
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>

{#if $appStatus === APP_STATUS.INIT}
  <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
  <Alert color="red">
    <span class="font-medium">¡Algo salió mal!</span>
    Ocurrió un error
  </Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
  <StepChat />
{:else}
  <Alert color="red">
    <span class="font-medium">¡Algo salió mal!</span>
    Ocurrió un error
  </Alert>
{/if}
