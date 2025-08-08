import Loader from '../components/Loader';
import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiCheckCircle, FiUpload, FiEdit, FiX, FiCamera } from 'react-icons/fi';

function UserProfileUpdate() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/profile');
        setUser(res.data.data);
        setFormData({ 
          name: res.data.data.name || '', 
          phone: res.data.data.phone || '' 
        });
        if (res.data.data.avatar?.url) {
          setAvatarPreview(res.data.data.avatar.url);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setAvatarFile(file);
      setIsAvatarUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setIsAvatarUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(user.avatar?.url || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const res = await axiosInstance.patch('/update-profile', data);
      setUser(res.data.data);
      setAvatarFile(null);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error(err.response?.data?.message || 'Profile update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-35 mb-20">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative self-center md:self-start group">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#ff7f50] relative">
            {isAvatarUploading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ff7f50]"></div>
              </div>
            ) : (
              <>
                <img
                  src={avatarPreview || 'https://via.placeholder.com/150?text=No+Avatar'}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <FiCamera className="text-white text-2xl" />
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-center mt-4 space-x-2">
            <label className="cursor-pointer bg-[#ff7f50] hover:bg-[#4a2419] text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center">
              <FiUpload className="mr-2" />
              Change
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
                ref={fileInputRef}
              />
            </label>
            {avatarFile && (
              <button 
                type="button"
                onClick={removeAvatar}
                className="bg-[#FFD6A5] hover:bg-[#FFC58F] text-[#3E2A20] py-2 px-4 rounded-lg text-sm font-medium transition flex items-center"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#ff7f50] mb-3">{user.username}</h2>
          
          <div className="space-y-3 text-[#5c2c1e]">
            <div className="flex items-center bg-[#FFF7ED] p-3 rounded-lg">
              <FiUser className="mr-3 text-[#ff7f50] text-lg" />
              <div>
                <p className="text-xs text-[#7B4B2A]">Full Name</p>
                <p className="font-medium">{user.name || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-[#FFF7ED] p-3 rounded-lg">
              <FiMail className="mr-3 text-[#ff7f50] text-lg" />
              <div>
                <p className="text-xs text-[#7B4B2A]">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            
            {user.phone && (
              <div className="flex items-center bg-[#FFF7ED] p-3 rounded-lg">
                <FiPhone className="mr-3 text-[#ff7f50] text-lg" />
                <div>
                  <p className="text-xs text-[#7B4B2A]">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center bg-[#FFF7ED] p-3 rounded-lg">
              <div className="mr-3 w-6 h-6 flex items-center justify-center">
                {user.isVerified ? (
                  <FiCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-yellow-500"></div>
                )}
              </div>
              <div>
                <p className="text-xs text-[#7B4B2A]">Verification Status</p>
                <p className="font-medium">
                  {user.isVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-[#5C2C1E] mb-6 flex items-center">
          <FiEdit className="mr-2" /> Update Profile Information
        </h3>
        
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#5C2C1E] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition placeholder-[#B08866]"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#5c2d1e] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#FFD6A5] rounded-lg focus:ring-2 focus:ring-[#ff7f50] focus:border-[#ff7f50] outline-none transition placeholder-[#B08866]"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#ff7f50] hover:bg-[#4a2419] text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfileUpdate;