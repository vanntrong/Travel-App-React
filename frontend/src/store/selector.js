import { createSelector } from "reselect";

const pinSelector = (state) => state.pins;
const filterCategorySelector = (state) => state.filter.category;
const filterRatingSelector = (state) => state.filter.rating;

export const pinRemainingSelector = createSelector(
  pinSelector,
  filterCategorySelector,
  filterRatingSelector,
  (pinList, category, rating) => {
    console.log({ category, rating });

    return pinList.filter((pin) => {
      return !category.length
        ? rating !== 0
          ? pin.rating === rating
          : true
        : pin.title.toLowerCase().includes(category.toLowerCase()) && (rating !== 0 ? pin.rating === rating : true);
    });
  }
);
