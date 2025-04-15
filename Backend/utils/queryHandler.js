// utils/mongoQueryHandlers.js
const Property = require('../models/propertyModel');

const queryHandlers = {
  async book_property(message) {
    return "To book a property, please provide the property name and your desired dates.";
  },

  async find_with_amenity(message) {
    const amenities = ["pool", "wifi", "kitchen", "parking", "ac"];
    const foundAmenity = amenities.find((am) => message.toLowerCase().includes(am));

    if (!foundAmenity) return "Which amenity are you looking for?";

    const properties = await Property.find({
      'amenities.name': { $regex: new RegExp(foundAmenity, 'i') }
    }).limit(5);

    if (!properties.length) return `Sorry, no properties found with ${foundAmenity}.`;

    return `Found ${properties.length} properties with ${foundAmenity}: ` +
           properties.map(p => p.propertyName).join(", ");
  },

  async find_by_type(message) {
    const types = ["villa", "house", "flat", "guest house", "hotel"];
    const typeMatch = types.find(t => message.toLowerCase().includes(t));

    if (!typeMatch) return "What type of property are you looking for?";

    const properties = await Property.find({
      propertyType: { $regex: new RegExp(typeMatch, 'i') }
    }).limit(5);

    return properties.length
      ? `We found ${properties.length} ${typeMatch}s: ` + properties.map(p => p.propertyName).join(", ")
      : `Sorry, no ${typeMatch}s found.`;
  },

  async find_by_location(message) {
    const regex = /(?:in|at|near)\s+([a-zA-Z\s]+)/i;
    const match = message.match(regex);
    if (!match) return "Please specify a location (e.g., 'in Delhi').";

    const location = match[1].trim();
    const properties = await Property.find({
      $or: [
        { 'address.city': { $regex: new RegExp(location, 'i') } },
        { 'address.state': { $regex: new RegExp(location, 'i') } }
      ]
    }).limit(5);

    return properties.length
      ? `Found ${properties.length} properties in ${location}: ` + properties.map(p => p.propertyName).join(", ")
      : `Sorry, no properties found in ${location}.`;
  },

  async find_by_budget(message) {
    const regex = /under\s*\₹?\s*(\d+)/i;
    const match = message.match(regex);
    if (!match) return "Please specify a budget (e.g., 'under ₹1000').";

    const maxBudget = parseInt(match[1]);
    const properties = await Property.find({
      price: { $lte: maxBudget }
    }).limit(5);

    return properties.length
      ? `Here are properties under ₹${maxBudget}: ` + properties.map(p => p.propertyName).join(", ")
      : `Sorry, no properties found under ₹${maxBudget}.`;
  },

  async list_amenities() {
    return "Available amenities include: Wifi, Pool, Kitchen, AC, Parking, TV, Washing Machine.";
  },

  async help() {
    return "You can ask things like: \n- Show villas in Delhi\n- Find properties with pool\n- List all amenities\n- Book a villa\n- Find places under ₹2000";
  },

  async fallback() {
    return "I'm sorry, I didn't get that. Can you rephrase? You can ask things like 'show properties in Bangalore' or 'find a villa with wifi'.";
  }
};

module.exports = queryHandlers;