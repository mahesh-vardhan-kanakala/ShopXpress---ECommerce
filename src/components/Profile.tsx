import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Phone, Mail, User, Edit2, Save, X } from 'lucide-react';

interface ProfileForm {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  street: string;
  city: string;
  number: number;
  zipcode: string;
}

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileForm>({
    email: user?.email || '',
    username: user?.username || '',
    firstname: user?.name.firstname || '',
    lastname: user?.name.lastname || '',
    phone: user?.phone || '',
    street: user?.address.street || '',
    city: user?.address.city || '',
    number: user?.address.number || 0,
    zipcode: user?.address.zipcode || '',
  });

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            street: formData.street,
            city: formData.city,
            number: formData.number,
            zipcode: formData.zipcode,
            geolocation: user.address.geolocation,
          },
          phone: formData.phone,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedUser = await response.json();
      updateUser(updatedUser);
      setIsEditing(false); // Exit editing mode after successful update
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      handleSubmit(new Event('submit')); // Trigger form submission if editing
    } else {
      setIsEditing(true); // Switch to edit mode if not in editing
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="px-2 py-1 text-white rounded bg-white/10"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="px-2 py-1 text-white rounded bg-white/10"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    `${user.name.firstname} ${user.name.lastname}`
                  )}
                </h1>
                <p className="mt-1 text-blue-100">
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="px-2 py-1 text-white rounded bg-white/10"
                      placeholder="Username"
                    />
                  ) : (
                    user.username
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={toggleEditMode}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20"
              disabled={loading}
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between p-3 text-red-500 rounded-md bg-red-50">
              {error}
              <button onClick={() => setError(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-2 py-1 border rounded"
                        placeholder="Email"
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-2 py-1 border rounded"
                        placeholder="Phone"
                      />
                    ) : (
                      <span>{user.phone}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Address</h2>
                <div className="space-y-4">
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded"
                            placeholder="Street"
                          />
                          <input
                            type="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-20 px-2 py-1 border rounded"
                            placeholder="No."
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded"
                            placeholder="City"
                          />
                          <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            className="px-2 py-1 border rounded"
                            placeholder="ZIP Code"
                          />
                        </div>
                        {/* Save Changes Button */}
                        {isEditing && (
                          <button
                            onClick={handleSubmit}
                            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                            disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save Changes'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p>{user.address.street} {user.address.number}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

