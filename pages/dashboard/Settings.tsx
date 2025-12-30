import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';
import { getUserProfile, updateUserProfile, changePassword } from '../../Api/authonticationUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interface for User Profile
interface UserProfile {
  _id: string;
  name: string; // Full name
  email: string;
  phone?: string;
  organizationName?: string;
  services?: string[];
  message?: string;
}

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        if (data.success) {
          setProfile(data.user);

          const nameParts = data.user.name?.split(' ') || [];
          setFirstName(nameParts[0] || '');
          setLastName(nameParts.slice(1).join(' ') || '');
          setEmail(data.user.email || '');
          setPhone(data.user.phone || '');
        }
      } catch (error) {
        console.error(error);
      } 
    };

    fetchProfile();
  }, []);

  // Update profile info
  const handleSave = async () => {
    if (!firstName || !lastName) {
      alert('First Name and Last Name are required');
      return;
    }

    const updatedData = {
      name: `${firstName} ${lastName}`,
      phone: phone,
    };

    try {
      setSaving(true);
      const data = await updateUserProfile(updatedData);
      if (data.success) {
        toast.success("Profile updated successfully!");
        setProfile(data.user);
      } else {
         toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating profile');
    } finally {
      setSaving(false);
    }
  };

  // Change password
 const handlePasswordChange = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.warning("Please fill all password fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New Password and Confirm Password do not match!");
    return;
  }

  if (currentPassword === newPassword) {
    toast.error("New password cannot be the same as current password!");
    return;
  }

  try {
    setPasswordSaving(true);
    const res = await changePassword({
      currentPassword,
      newPassword,
    });

    if (res.success) {
      toast.success("Password updated successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error(res.message || "Failed to update password");
    }
  } catch (error: any) {
   
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Error updating password");
    } else {
      toast.error(error.message || "Error updating password");
    }
  } finally {
    setPasswordSaving(false);
  }
};




  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>

      {/* Profile Information */}
      <Card title="Profile Information">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <Input label="Email Address" value={email} readOnly className="bg-gray-100" />
          <Input label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          <div className="pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Security / Change Password */}
      <Card title="Security">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>

          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <div className="pt-2">
            <Button size="sm" onClick={handlePasswordChange} disabled={passwordSaving}>
              {passwordSaving ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card title="Notification Preferences">
        <div className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Email Notifications</h4>
              <p className="text-sm text-gray-500 mb-2">Sent to {email}</p>
              <p className="text-xs font-bold text-gray-700">24 sent this month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">WhatsApp Notifications</h4>
              <p className="text-sm text-gray-500 mb-2">Sent to {phone}</p>
              <p className="text-xs font-bold text-gray-700">12 sent this month</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
