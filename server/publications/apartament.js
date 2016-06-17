/**
 * Created by danielsilva on 15/06/16.
 */
import { Apartment } from '../../imports/apartament.js';

Meteor.publish('apartments', function (search) {
    check(search, Match.OneOf(String, null, undefined));
    let query = {},
        projection = {limit: 1, sort: {text: 1}};

    projection.limit = 5;
    if (search) {
        let regex = new RegExp(search, 'i');
        query = {
            $or: [
                {title: regex},
                {_id: regex},
                {owner: regex},
                {price: regex},
                {date: regex},
                {description: regex},
                {city: regex}
            ]
        };
        projection.limit = 10;
    }

    return Apartment.find(query,projection);
});

