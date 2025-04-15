const mongoose = require('mongoose');
const slugify = require('slugify');

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, 'Please enter your property name']
  },
  description: {
    type: String,
    required: [true, 'Please add information about your property.']
  },
  extraInfo: {
    type: String,
    default: "Nestled in a tranquil neighborhood, the house exudes charm and elegance. The exterior blends classic and contemporary styles with a brick facade and a welcoming porch. Inside, the spacious living room features large windows, high ceilings, and hardwood floors. The kitchen includes modern appliances, sleek countertops, and ample storage, opening to a cozy dining area—perfect for gatherings."
  },
  propertyType: {
    type: String,
    enum: ['House', 'Flat', 'Guest House', 'Hotel'],
    default: 'House'
  },
  roomType: {
    type: String,
    enum: ['Anytype', 'Room', 'Entire Home'],
    default: 'Anytype'
  },
  maximumGuest: {
    type: Number,
    required: [true, 'Please specify the maximum number of guests.']
  },
  amenities: [{
    name: {
      type: String,
      required: true,
      enum: ['Wifi', 'Kitchen', 'Ac', 'Pool', 'Tv', 'Free Parking', 'Washing Machine']
    },
    icon: {
      type: String,
      required: true
    }
  }],
  images: {
    type: [{
      public_id: { type: String },
      url: { type: String, required: true }
    }],
    validate: {
      validator: function (arr) {
        return arr.length >= 5;
      },
      message: 'The images array must contain at least 5 images.'
    }
  },
  price: {
    type: Number,
    required: [true, 'Please enter the price per night.'],
    default: 500
  },
  address: {
    area: String,
    city: String,
    state: String,
    pincode: Number
  },
  currentBookings: [{
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    fromDate: Date,
    toDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: String,
  checkInTime: {
    type: String,
    default: '11:00'
  },
  checkOutTime: {
    type: String,
    default: '13:00'
  }
});

propertySchema.pre('save', function (next) {
  this.slug = slugify(this.propertyName, { lower: true });
  next();
});

propertySchema.pre('validate', function (next) {
  if (this.address && this.address.city) {
    this.address.city = this.address.city.toLowerCase().replaceAll(' ', '');
  }
  next();
});

// ✅ Prevent OverwriteModelError on hot reloads
const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
module.exports = Property;
