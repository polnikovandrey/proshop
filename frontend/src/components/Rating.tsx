import React from "react";
import {ProductRatingData} from "../data/ProductRatingData";

// www.fontawesome.com styles are being used to draw stars
export const Rating = ({ ratingData, color } : { ratingData: ProductRatingData, color: string }) => {
    return (
        <div className='rating'>
            <span>
                <i style={{ color }}
                   className={
                       ratingData.rating >= 1
                           ? 'fas fa-star'
                           : ratingData.rating > 0.5
                               ? 'fas fa-star-half-alt'
                               : 'far fa-star'}/>
                <i style={{ color }}
                   className={
                       ratingData.rating >= 2
                           ? 'fas fa-star'
                           : ratingData.rating > 1.5
                               ? 'fas fa-star-half-alt'
                               : 'far fa-star'}/>
                <i style={{ color }}
                   className={
                       ratingData.rating >= 3
                           ? 'fas fa-star'
                           : ratingData.rating > 2.5
                               ? 'fas fa-star-half-alt'
                               : 'far fa-star'}/>
                <i style={{ color }}
                   className={
                       ratingData.rating >= 4
                           ? 'fas fa-star'
                           : ratingData.rating > 3.5
                               ? 'fas fa-star-half-alt'
                               : 'far fa-star'}/>
                <i style={{ color }}
                   className={
                       ratingData.rating >= 5
                           ? 'fas fa-star'
                           : ratingData.rating > 4.5
                               ? 'fas fa-star-half-alt'
                               : 'far fa-star'}/>
            </span>
            <span>{ratingData.numReviews} reviews</span>
        </div>
    );
}

Rating.defaultProps = {
    color: '#f8e825'
}