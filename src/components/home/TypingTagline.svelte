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

<p class="tagline">
  <span class="sr-only">{phrases.join(". ")}</span>
  {#each phrases as phrase}
    <span class="ghost" aria-hidden="true"
      >{phrase}<span class="caret">|</span></span
    >
  {/each}
  <span aria-hidden="true">{shown}<span class="caret">|</span></span>
</p>

<style>
  .tagline {
    display: grid;
    margin: 0;
    font-size: var(--step-1);
    font-weight: 700;
    color: var(--text);
  }
  /* Typed text and the invisible phrases share one cell. */
  .tagline > :not(.sr-only) {
    grid-area: 1 / 1;
  }
  .ghost {
    visibility: hidden;
  }
  .caret {
    margin-inline-start: 0.1em;
    color: var(--lamp-ink);
    animation: blink 1s steps(1) infinite;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .caret {
      animation: none;
    }
  }
</style>
