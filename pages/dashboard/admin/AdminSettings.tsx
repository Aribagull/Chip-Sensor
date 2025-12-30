import React from 'react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
      
      <Card title="Admin Profile">
        <form className="space-y-4">
          <Input label="Name" defaultValue="Admin User" />
          <Input label="Email" defaultValue="admin@acooler.com" />
          <div className="border-t border-gray-100 pt-4 mt-2">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button>Save Settings</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminSettings;