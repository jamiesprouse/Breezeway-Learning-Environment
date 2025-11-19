import { useState } from 'react';
import { Search, Home, MapPin, Bed, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  bedrooms: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  imageUrl: string;
}

export function PropertiesView() {
  const [searchTerm, setSearchTerm] = useState('');

  const properties: Property[] = [
    {
      id: 1,
      name: 'Sunset Villa #301',
      address: '123 Ocean Drive, Miami Beach, FL',
      type: 'Villa',
      bedrooms: 3,
      capacity: 6,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      name: 'Ocean View Condo',
      address: '456 Coastal Blvd, Santa Monica, CA',
      type: 'Condo',
      bedrooms: 2,
      capacity: 4,
      status: 'occupied',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      name: 'Mountain Lodge #12',
      address: '789 Pine Trail, Aspen, CO',
      type: 'Lodge',
      bedrooms: 4,
      capacity: 8,
      status: 'maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      name: 'Beach House A',
      address: '321 Shoreline Ave, Malibu, CA',
      type: 'House',
      bedrooms: 5,
      capacity: 10,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      name: 'Downtown Loft #5',
      address: '555 Main Street, Portland, OR',
      type: 'Loft',
      bedrooms: 1,
      capacity: 2,
      status: 'occupied',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      name: 'Garden Suite #8',
      address: '888 Park Lane, Austin, TX',
      type: 'Suite',
      bedrooms: 2,
      capacity: 4,
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Property['status']) => {
    const styles = {
      available: 'bg-green-100 text-green-700',
      occupied: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-yellow-100 text-yellow-700',
    }[status];

    return (
      <span className={`px-2 py-1 rounded text-xs ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Properties</h1>
        <p className="text-gray-600">Manage your property portfolio</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={property.imageUrl}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(property.status)}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-gray-900 mb-1">{property.name}</h3>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{property.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Home className="w-4 h-4" />
                  <span>{property.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{property.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
