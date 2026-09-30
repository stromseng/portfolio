<!--
  Types and erases a list of short phrases in a loop.
  With prefers-reduced-motion it shows the first phrase and stays still.
  Screen readers get the whole list once instead of the flickering text.
  Every phrase is also laid out invisibly in the same grid cell, so the line
  always has the height of the longest one and nothing below it jumps when a
  long phrase wraps on a narrow screen.
-->
<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    phrases: readonly string[];
  }

  const { phrases }: Props = $props();

  let shown = $state(phrases[0] ?? "");

  // The typed text and the invisible phrases share one grid cell.
  const cell = "col-start-1 row-start-1";
  // `blink` is in scenes.css.
  const caret =
    "ms-0.5 text-lamp-ink motion-safe:animate-[blink_1s_steps(1)_infinite]";

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;

    (async () => {
      // The server already rendered the first phrase in full, so each round
      // holds and erases the current phrase, then types the next one.
      for (let i = 0; alive; ) {
        await wait(1800);
        for (let n = phrases[i].length; alive && n >= 0; n--) {
          shown = phrases[i].slice(0, n);
          await wait(45);
        }
        await wait(300);
        i = (i + 1) % phrases.length;
        for (let n = 1; alive && n <= phrases[i].length; n++) {
          shown = phrases[i].slice(0, n);
          await wait(110);
        }
      }
    })();

    return () => {
      alive = false;
    };
  });
</script>

<p class="grid text-xl font-bold text-ink">
  <span class="sr-only">{phrases.join(". ")}</span>
  {#each phrases as phrase}
    <span class="invisible {cell}" aria-hidden="true"
      >{phrase}<span class={caret}>|</span></span
    >
  {/each}
  <span class={cell} aria-hidden="true"
    >{shown}<span class={caret}>|</span></span
  >
</p>
