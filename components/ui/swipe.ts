// On phones, turn a card grid into an app-style horizontal swipe row (cards
// snap into place, the next card peeks in). From `sm` up the element's own
// grid classes take over again. Put SWIPE_ROW on the grid and SWIPE_ITEM on
// each card. The row bleeds to the screen edge to cancel Container's px-5.
export const SWIPE_ROW =
  "no-scrollbar max-sm:-mx-5 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:scroll-px-5 max-sm:px-5 max-sm:pb-2 max-sm:gap-3";

export const SWIPE_ITEM = "max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start";
