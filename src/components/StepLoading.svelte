<script>
  import { Spinner, Button } from "flowbite-svelte";
</script>

<div class="flex justify-center items-center flex-col gap-y-2">
  <Button outline color="dark">
    <Spinner class="me-3 opacity-75" size="4" />
    Loading ...
  </Button>
</div>
