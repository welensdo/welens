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

export interface IOrderItem {
  eye: 'left' | 'right';
  type: 'miopia' | 'hipermetropia' | 'presbicia';
  value: number;
  price: number;
}

export interface IOrder extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
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
        eye: {
          type: String,
          enum: ['left', 'right'],
          required: true,
        },
        type: {
          type: String,
          enum: ['miopia', 'hipermetropia', 'presbicia'],
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
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
