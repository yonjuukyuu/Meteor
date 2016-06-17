/**
 * Created by danielsilva on 15/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Apartment = new Mongo.Collection('apartment');


if ( Meteor.isServer ) {
    Apartment._ensureIndex( { _id: 1, title: 1, owner: 1, price: 1, date: 1,description: 1, city:1} );

   /* Apartment.insert({
        title: "T5 APARTMENT MODERN RENEW ",
        owner: "Daniel Silva",
        price: "450€",
        date: new Date(),
        description: "Apartment for rent, One year min",
        city: "Faro"
    });*/
}

Apartment.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Apartment.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let ApartmentSchema = new SimpleSchema({
    '_id': {
        type: String,
        label: 'The title of this Apartament.'
    },
    'title': {
        type: String,
        label: 'The title of this Apartament.'
    },
    'owner': {
        type: String,
        label: 'The Owner of this Apartament.'
    },
    'price': {
        type: String,
        label: 'The price of this Apartament'
    },
    'date': {
        type: String,
        label: 'The Username of this Apartament'
    },
    'description': {
        type: String,
        label: 'The Username of this Apartament'
    },
    'city': {
        type: String,
        label: 'The Username of this Apartament'
    }
});

Apartment.attachSchema( ApartmentSchema );


