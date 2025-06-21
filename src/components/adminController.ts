// ✅ Admin Controller Logic with Comments

import { Request, Response } from 'express';

import Product from '@/models/Product';
import User from '@/models/User';

// 🔹 View all users (Admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার ত্রুটি' });
  }
};

// 🔹 Delete any user by ID (Admin only)
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'ইউজার ডিলিট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'ইউজার ডিলিটে সমস্যা হয়েছে' });
  }
};

// 🔹 Add a new product (Admin only)
export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: 'প্রোডাক্ট যুক্ত হয়েছে', product });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট যুক্ত করতে সমস্যা হয়েছে' });
  }
};

// 🔹 Update any product (Admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updated = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.status(200).json({ message: 'প্রোডাক্ট আপডেট হয়েছে', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট আপডেটে সমস্যা হয়েছে' });
  }
};

// 🔹 Delete any product (Admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'প্রোডাক্ট ডিলিট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট ডিলিটে সমস্যা হয়েছে' });
  }
};

// 🔹 Pagination with skip & limit
export const getProductsPaginated = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({ products, total });
  } catch (error) {
    res.status(500).json({ message: 'Pagination করতে সমস্যা হয়েছে' });
  }
};

// 🔹 Filter by category
export const filterByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'ক্যাটাগরি ফিল্টারে সমস্যা হয়েছে' });
  }
};

// 🔹 Search by keyword
export const searchByKeyword = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'সার্চ করতে সমস্যা হয়েছে' });
  }
};
