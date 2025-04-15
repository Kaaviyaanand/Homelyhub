// utils/intentEngine.js

function detectIntent(message) {
    const msg = message.toLowerCase();
  
    if (msg.includes("book") && (msg.includes("room") || msg.includes("villa"))) {
      return "book_property";
    }
  
    if (msg.includes("show") || msg.includes("find")) {
      if (msg.includes("pool") || msg.includes("swimming")) {
        return "find_with_amenity";
      }
      if (msg.includes("villa") || msg.includes("hotel") || msg.includes("flat") || msg.includes("room")) {
        return "find_by_type";
      }
      if (msg.includes("delhi") || msg.includes("goa") || msg.includes("jaipur")) {
        return "find_by_location";
      }
      if (msg.includes("under") || msg.includes("below") || msg.includes("price")) {
        return "find_by_budget";
      }
      return "general_search";
    }
  
    if (msg.includes("amenities") || msg.includes("features")) {
      return "list_amenities";
    }
  
    if (msg.includes("help") || msg.includes("how") || msg.includes("assist")) {
      return "help";
    }
  
    return "fallback";
  }
  
  module.exports = detectIntent;
  