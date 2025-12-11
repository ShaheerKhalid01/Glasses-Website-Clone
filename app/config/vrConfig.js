'use client';

import { useRouter } from 'next/navigation';

export const navigateToVR = (productId) => {
  if (typeof window === 'undefined') return;
  const router = useRouter();
  router.push(`/vr?product=${productId}`);
};

export const getProductForVR = (productId) => {
  if (typeof window === 'undefined') return null;
  try {
    const savedProducts = localStorage.getItem('eyewear-products');
    if (!savedProducts) return null;
    const products = JSON.parse(savedProducts);
    return products.find(p => p.id === productId) || null;
  } catch (err) {
    console.error('Error accessing localStorage:', err);
    return null;
  }
};

export const getProductIdFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('product');
};