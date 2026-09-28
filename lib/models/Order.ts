import mongoose from 'mongoose';

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'manufacturing' 
  | 'quality_check'
  | 'packaging' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface ILensItem {
  itemType: 'lens';
  eye: 'left' | 'right';
  type: 'miopia' | 'hipermetropia' | 'presbicia';
  value: number;
  price: number;
}

export interface IAccessoryItem {
  itemType: 'accessory';
  name: string;
  quantity: number;
  price: number;
}

export type IOrderItem = ILensItem | IAccessoryItem;

export interface IOrder extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    address: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  trackingNumber?: string;
  statusHistory: Array<{
    status: OrderStatus;
    date: Date;
    note?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        itemType: {
          type: String,
          enum: ['lens', 'accessory'],
          required: true,
        },
        // Lens-specific fields
        eye: {
          type: String,
          enum: ['left', 'right'],
          required: function(this: any) {
            return this.itemType === 'lens';
          },
        },
        type: {
          type: String,
          enum: ['miopia', 'hipermetropia', 'presbicia'],
          required: function(this: any) {
            return this.itemType === 'lens';
          },
        },
        value: {
          type: Number,
          required: function(this: any) {
            return this.itemType === 'lens';
          },
        },
        // Accessory-specific fields
        name: {
          type: String,
          required: function(this: any) {
            return this.itemType === 'accessory';
          },
        },
        quantity: {
          type: Number,
          required: function(this: any) {
            return this.itemType === 'accessory';
          },
        },
        // Common field
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'manufacturing',
        'quality_check',
        'packaging',
        'shipped',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    trackingNumber: String,
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
