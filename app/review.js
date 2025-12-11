'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function CustomerReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: 'Zaheer baloch',
      rating: 5,
      title: 'Excellent',
      comment: 'Excellent frame in this price range',
      date: '24-03-2025',
      size: 'Medium',
      product: 'David Beckham 1063 ( Black Tortoise )',
      images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 2,
      name: 'Hania Tareen',
      rating: 5,
      title: 'Excellent service and delivery',
      comment: 'Excellent fit. Easy selection and ordering process. Very good price. Excellent service and delivery.',
      date: '24-10-2024',
      size: 'Medium',
      product: 'Ray Ban Wayfarer ( Black )',
      images: ['https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 3,
      name: 'Nimra',
      rating: 5,
      title: "I'm really impressed",
      comment: 'I recently bought these glasses and I\'m really impressed.',
      date: '04-01-2021',
      size: 'Medium',
      product: 'Raposol 9518 ( Black )',
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1577803645773-f96470509666?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1622519407650-3df9883f76a6?w=200&h=200&fit=crop'
      ],
      verified: true
    },
    {
      id: 4,
      name: 'Ahmed Khan',
      rating: 5,
      title: 'Perfect quality',
      comment: 'Amazing quality for the price. Very satisfied with my purchase.',
      date: '15-02-2025',
      size: 'Large',
      product: 'Tom Ford FT5870 ( Black )',
      images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 5,
      name: 'Sana Malik',
      rating: 5,
      title: 'Great experience',
      comment: 'Fast delivery and excellent packaging. The glasses look even better in person!',
      date: '10-02-2025',
      size: 'Small',
      product: 'Gucci GG15360 ( Tortoise )',
      images: ['https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 6,
      name: 'Bilal Hassan',
      rating: 4,
      title: 'Good value',
      comment: 'Quality is good for the price. Would recommend to others.',
      date: '05-02-2025',
      size: 'Medium',
      product: 'Prada VPR A10V ( Black Silver )',
      images: [],
      verified: true
    },
    {
      id: 7,
      name: 'Fatima Ali',
      rating: 5,
      title: 'Highly recommend',
      comment: 'Beautiful frames and great customer service. Will definitely order again.',
      date: '28-01-2025',
      size: 'Medium',
      product: 'Ray Ban RB5154 ( Black )',
      images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 8,
      name: 'Usman Tariq',
      rating: 5,
      title: 'Exceeded expectations',
      comment: 'The quality is outstanding. Very happy with my purchase from Ainak.pk',
      date: '20-01-2025',
      size: 'Large',
      product: 'Moscot Lemtosh ( Brown )',
      images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 9,
      name: 'Ayesha Raza',
      rating: 5,
      title: 'Love them!',
      comment: 'These glasses are perfect! Comfortable fit and stylish design.',
      date: '12-01-2025',
      size: 'Small',
      product: 'Mont Blanc MB0351O ( Gold )',
      images: [
        'https://images.unsplash.com/photo-1608427992634-a2f2d04e8a4e?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1620405891136-8f78549eec7c?w=200&h=200&fit=crop'
      ],
      verified: true
    },
    {
      id: 10,
      name: 'Hassan Ahmed',
      rating: 5,
      title: 'Best online eyewear store',
      comment: 'Quick delivery to Lahore. Product exactly as shown. Great experience!',
      date: '05-01-2025',
      size: 'Medium',
      product: 'Tom Ford FT5734 ( Black Brown )',
      images: ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=200&h=200&fit=crop'],
      verified: true
    },
    {
      id: 11,
      name: 'Maria Khalid',
      rating: 5,
      title: 'Perfect fit',
      comment: 'Love the style and comfort. Thank you Ainak.pk!',
      date: '30-12-2024',
      size: 'Small',
      product: 'Ray Ban Aviator ( Silver )',
      images: [],
      verified: true
    },
    {
      id: 12,
      name: 'Zain Abbas',
      rating: 4,
      title: 'Good quality',
      comment: 'Nice frames, good price. Delivery was fast.',
      date: '22-12-2024',
      size: 'Large',
      product: 'Oakley OO9102 ( Black )',
      images: ['https://images.unsplash.com/photo-1606341154106-ca5171ce1c97?w=200&h=200&fit=crop'],
      verified: true
    },
  ];

  const totalReviews = 12800; // Total reviews count
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  // Calculate average rating
  const averageRating = 4.9;
  const ratingCounts = {
    5: 12100,
    4: 550,
    3: 100,
    2: 30,
    1: 20
  };

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-red-700 cursor-pointer">Home</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-900 font-medium">Customer Reviews</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Customer Reviews
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8">
              Reviews ({totalReviews.toLocaleString()})
            </p>
            
            {/* Rating Summary */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Average Rating */}
                <div className="text-center">
                  <div className="text-6xl font-black text-gray-900 mb-2">
                    {averageRating}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Based on {totalReviews.toLocaleString()} reviews
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="w-full md:w-96">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-sm font-medium text-gray-700">{rating}</span>
                        <Star className="w-4 h-4 fill-red-500 text-red-500" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${(ratingCounts[rating] / totalReviews) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">
                        {ratingCounts[rating].toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    
                    {/* Review Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      "{review.title}"
                    </h3>
                    
                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.comment}
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="text-right md:text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 mb-1">{review.name}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      Reviewed on {review.date}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Size {review.size}
                    </p>
                    <p className="text-sm text-red-700 font-medium">
                      {review.product}
                    </p>
                  </div>
                </div>

                {/* Review Images */}
                {review.images.length > 0 && (
                  <div className="flex gap-3 flex-wrap mt-4">
                    {review.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-red-500 transition-colors cursor-pointer group"
                      >
                        <Image
                          src={img}
                          alt={`Review image ${idx + 1}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Navigation arrows for multiple images */}
                        {idx === 0 && review.images.length > 1 && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-red-600 text-white rounded-full p-1.5 shadow-lg">
                              <ChevronLeft className="w-4 h-4" />
                            </div>
                          </div>
                        )}
                        {idx === review.images.length - 1 && review.images.length > 1 && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-red-600 text-white rounded-full p-1.5 shadow-lg">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 py-8 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`font-bold px-5 py-3 rounded transition-colors ${
                    currentPage === i + 1
                      ? 'bg-red-700 text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Join Thousands of Happy Customers!
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the quality and service that our customers love. Shop now and see why Ainak.pk is Pakistan's trusted eyewear destination.
          </p>
          <button className="bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl">
            Shop Now
          </button>
        </div>
      </div>

    </div>
  );
}