# Product reviews

A reviews section below the product: rating summary, filters, the list of reviews and pagination. It is a bonus feature.

**Files:** `src/features/reviews/`: `components/` (`ProductReviews`, `ReviewSummary`, `ReviewFilters`, `ReviewCard`, `ReviewPagination`, `StarRating`), `utils/` (`reviews.ts`, `exampleReviews.ts`), `reviews.types.ts` and `index.ts`, which exports only `ProductReviews`. It is its own feature because it does not use the product data, and it does not import any other feature. Two generic pieces live in `shared/ui`: `DashedBox` (the dashed 0.8px border with 6px dashes, drawn as an SVG because CSS cannot set the dash length) and `Checkbox` (the 24px checkbox from the design). `ProductDetailsPage` renders `ProductReviews` in its own section under the product.

## Example data

The API (`?join=reviews`) does not return any reviews, so the section shows 14 example reviews from `utils/exampleReviews.ts`, with a small "Example reviews for this demo." note next to the title. The `Review` type is in `reviews.types.ts`. If the API gets reviews later, only the source of the list needs to change.

## Design

Values are taken from the Figma frame: an 80px gap and the dashed divider above the section, 74px to the 28px title, the summary box (84px ring with a 3px line, 20px stars, 8px bars), the filter box (278px wide, dashed dividers between the groups), the review list (882px wide, 32px gap and a dashed divider between reviews), the tabs, the like and dislike buttons (50px high) and the 44px page buttons. The first page uses the names, dates and likes from the design.

Mobile follows the Figma mobile frame (base classes are mobile, `lg:` classes are desktop): 56px from the divider to the 24px title, 16px to the summary box (64px ring, 12px text, 16px stars on the bars), 16px "Review Lists" title, 32px tabs with 12px text, a 32px funnel button instead of the filter box, a 24px gap between reviews, the author and the 32px vote buttons on one row, and 36px page buttons. The reviewer photos are replaced by the first letter of the name.

## What it does

- **Summary:** average rating, stars, the total and one bar per star count. It always counts every review.
- **Tabs:** All Reviews, With Photo & Video, With Description.
- **Filters:** checkboxes for rating (1 to 5) and review topics. A review is shown when it has any of the chosen ratings and any of the chosen topics. The tab, the ratings and the topics are combined.
- **Mobile filters:** the filter box is hidden on mobile. The funnel button next to the tabs (`aria-expanded`) opens the same `ReviewFilters` under the tabs.
- **Filter groups:** Rating and Review Topics open and close (a native `<details>`, so no state).
- **Like and dislike:** each review has a like button with the count and a dislike button. The vote is local to the page (no API), and clicking again removes it.
- **Pagination:** 4 reviews per page, with an arrow only where there is a page to go to. Changing a filter goes back to page 1. With one page or less the buttons are hidden, and with no match a "No reviews match these filters." message is shown.

## State

The selected tab, ratings, topics and page are local state in `ProductReviews` (`useState`), because nothing else needs them. The summary is calculated once at module level, and the filtered list and the page count on every render, never stored. `ReviewSummary` and `ReviewFilters` use `memo`, and the toggle handlers use `useCallback`, so changing the tab or the page does not re-render them. This is a proof of concept, see [Memoization](../ARCHITECTURE.md#memoization). The logic is in pure functions in `utils/reviews.ts`: `filterReviews`, `getRatingSummary`, `paginate` and `toggleValue`.

## Accessibility

The section has a labelled heading, the tabs use `aria-pressed`, the checkboxes have labels ("5 stars"), the pagination is a `nav` with `aria-current="page"`, and the stars have a text label ("4 out of 5 stars").

## Not included

Saving a vote, writing a review, and photos or videos on a review. The avatar is the first letter of the name.

## Tests

`reviews.test.ts` (filters, summary, pagination helpers) and `ProductReviews.test.tsx` (summary, changing page, filtering, the empty message, the mobile filter button).
