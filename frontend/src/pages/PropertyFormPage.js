// PropertyFormPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyFormPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'House',
    size: {
      value: '',
      unit: 'Marla'
    },
    price: '',
    purpose: 'Sale',
    location: {
      city: '',
      area: '',
      address: ''
    },
    bedrooms: '',
    bathrooms: '',
    features: []
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/properties/new' } });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'features') {
      const featuresArray = value.split(',').map(feature => feature.trim());
      setFormData(prev => ({
        ...prev,
        features: featuresArray
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      setError('You can upload maximum 6 images');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const imageUrls = await uploadImages();
      const token = localStorage.getItem('token');
      const propertyData = {
        ...formData,
        images: imageUrls
      };

      await axios.post('/api/v1/properties', propertyData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImages = async () => {
    const uploadedImageUrls = [];
  
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('upload_preset', 'imarat'); // Use your preset name
  
      const response = await fetch('https://api.cloudinary.com/v1_1/dcvtzma3y/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      uploadedImageUrls.push(data.secure_url);
    }
  
    return uploadedImageUrls;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">List Your Property</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Basic Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} required maxLength={100} className="border p-2 rounded" />
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border p-2 rounded">
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
          </select>
          <select name="purpose" value={formData.purpose} onChange={handleChange} className="border p-2 rounded">
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="border p-2 rounded" />
        </div>

        {/* Size */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="size.value" type="number" placeholder="Size Value" value={formData.size.value} onChange={handleChange} required className="border p-2 rounded" />
          <select name="size.unit" value={formData.size.unit} onChange={handleChange} className="border p-2 rounded">
            <option value="Marla">Marla</option>
            <option value="Kanal">Kanal</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="location.city" type="text" placeholder="City" value={formData.location.city} onChange={handleChange} required className="border p-2 rounded" />
          <input name="location.area" type="text" placeholder="Area" value={formData.location.area} onChange={handleChange} required className="border p-2 rounded" />
        </div>
        <input name="location.address" type="text" placeholder="Complete Address" value={formData.location.address} onChange={handleChange} required className="border p-2 rounded w-full mb-6" />

        {/* Details */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required className="border p-2 rounded" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required className="border p-2 rounded" />
        </div>

        {/* Features */}
        <input name="features" type="text" placeholder="Features (comma separated)" onChange={handleChange} className="border p-2 rounded w-full mb-6" />

        {/* Description */}
        <textarea name="description" placeholder="Property Description" value={formData.description} onChange={handleChange} required maxLength={1000} className="border p-2 rounded w-full mb-6" />

        {/* Image Upload */}
        <p className="text-md">Upload Images (Maximum 6)</p>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-6" />
        <br />
        {/* Submit */}
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded">
          {isLoading ? 'Submitting...' : 'Submit Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyFormPage;