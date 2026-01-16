import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  form: any;
  onChange: (e: any) => void;
  onSubmit: (payload?: any) => void;
  isEdit?: boolean;
  storeId: string;
}

const AddSubStoreModal: React.FC<Props> = ({
  isOpen,
  onClose,
  form,
  onChange,
  onSubmit,
  isEdit,
  storeId,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topError, setTopError] = useState('');


  // ---------------- Validation ----------------
  const validatePhoneImmediate = (value: string) => {
    if (!value) return '';
    if (/[^0-9+]/.test(value)) return 'Phone number can only contain digits';
    return '';
  };


  const validatePhoneOnBlur = (value: string) => {
    if (!value) return 'Phone number is required';
    if (!/^\+\d{7,15}$/.test(value)) return 'Phone number must start with + and contain 7-15 digits';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'Invalid email address';
    return '';
  };

  // ---------------- Handlers ----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });

    let error = '';
    if (name.includes('phone')) error = validatePhone(value);
    if (name.includes('email')) error = validateEmail(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';
    if (name.includes('phone')) error = validatePhone(value);
    if (name.includes('email')) error = validateEmail(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

const validateAll = () => {
  const newErrors: Record<string, string> = {};

  ['1','2','3'].forEach(level => {
    // Phones
    const phones: string[] = Array.isArray(form[`phoneNumbersLevel${level}`])
      ? form[`phoneNumbersLevel${level}`]
      : [''];
    phones.forEach((phone, idx) => {
      const error = validatePhoneOnBlur(phone);
      if (error) newErrors[`phone-${level}-${idx}`] = error;
    });

    // Emails
    const emails: string[] = Array.isArray(form[`emailRecipientsLevel${level}`]) ? form[`emailRecipientsLevel${level}`] : [];
    emails.forEach((email, idx) => {
      const error = validateEmail(email);
      if (error) newErrors[`email-${level}-${idx}`] = error;
    });
  });

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setTopError('Please fix errors before creating the Sub-Store.');
    return false;
  } else {
    setTopError('');
    return true;
  }
};






  // ---------------- Dynamic Phone/Email ----------------
  const addField = (level: number, type: 'phone' | 'email') => {
    const key = type === 'phone' ? `phoneNumbersLevel${level}` : `emailRecipientsLevel${level}`;
    const updated = Array.isArray(form[key]) ? [...form[key], ''] : [''];
    onChange({ target: { name: key, value: updated } });
  };

  const removeField = (level: number, type: 'phone' | 'email', index: number) => {
    const key = type === 'phone' ? `phoneNumbersLevel${level}` : `emailRecipientsLevel${level}`;
    const updated = Array.isArray(form[key]) ? [...form[key]] : [];
    updated.splice(index, 1);
    onChange({ target: { name: key, value: updated } });
  };

  const handleDynamicChange = (
    level: number,
    type: 'phone' | 'email',
    index: number,
    value: string
  ) => {
    const key = type === 'phone' ? `phoneNumbersLevel${level}` : `emailRecipientsLevel${level}`;
    const updated = Array.isArray(form[key]) ? [...form[key]] : [];
    updated[index] = value;
    onChange({ target: { name: key, value: updated } });
  };

  // ---------------- Render Dynamic Fields ----------------
  const renderDynamicFields = (level: number) => {
    const phones: string[] = Array.isArray(form[`phoneNumbersLevel${level}`])
      ? form[`phoneNumbersLevel${level}`]
      : [''];
    const emails: string[] = Array.isArray(form[`emailRecipientsLevel${level}`])
      ? form[`emailRecipientsLevel${level}`]
      : [''];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phones */}
        <div>
          <label className="font-medium">Phone Level {level}</label>
          {phones.map((phone, idx) => (
            <div key={idx} className="flex flex-col gap-1 mt-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {

                    const cleanedValue = e.target.value.replace(/[^0-9+]/g, '');

                    handleDynamicChange(level, 'phone', idx, cleanedValue);

                    const error = validatePhoneImmediate(cleanedValue);
                    setErrors((prev) => ({ ...prev, [`phone-${level}-${idx}`]: error }));
                  }}
                  onBlur={(e) => {
                    const error = validatePhoneOnBlur(e.target.value);
                    setErrors((prev) => ({ ...prev, [`phone-${level}-${idx}`]: error }));
                  }}
                  placeholder="+XXXXXXXXXXX"
                  className="flex-1"
                />


                {idx > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="px-2 py-1 text-sm text-red-500"
                    onClick={() => removeField(level, 'phone', idx)}
                  >
                    Remove
                  </Button>
                )}
                {idx === 0 && (
                  <Button type="button" className="px-2 py-1 text-sm w-20" onClick={() => addField(level, 'phone')}>
                    + Add
                  </Button>
                )}
              </div>
              {errors[`phone-${level}-${idx}`] && (
                <span className="text-red-500 text-sm">{errors[`phone-${level}-${idx}`]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Emails */}
        <div>
          <label className="font-medium">Email Level {level}</label>
          {emails.map((email, idx) => (
            <div key={idx} className="flex flex-col gap-1 mt-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={email}
                  onChange={(e) => {
                    handleDynamicChange(level, 'email', idx, e.target.value);
                    const error = validateEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, [`email-${level}-${idx}`]: error }));
                  }}
                  onBlur={(e) => {
                    const error = validateEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, [`email-${level}-${idx}`]: error }));
                  }}
                  placeholder="example@gmail.com"
                  className="flex-1"
                />
                {idx > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="px-2 py-1 text-sm text-red-500"
                    onClick={() => removeField(level, 'email', idx)}
                  >
                    Remove
                  </Button>
                )}
                {idx === 0 && (
                  <Button type="button" className="px-2 py-1 text-sm w-20" onClick={() => addField(level, 'email')}>
                    + Add
                  </Button>
                )}
              </div>
              {errors[`email-${level}-${idx}`] && (
                <span className="text-red-500 text-sm">{errors[`email-${level}-${idx}`]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------------- Submit Handler ----------------
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateAll()) {
    return;
  }

  const cleanArrayOrRemove = (arr?: string[]) => {
    const cleaned = (arr || []).filter(item => item && item.trim() !== '');
    return cleaned.length > 0 ? cleaned : undefined; 
  };

  const payload = {
    name: form.name,
    location: form.location,
    notification_status: form.notificationStatus ? "on" : "off",
    phoneNumbersLevel1: cleanArrayOrRemove(form.phoneNumbersLevel1),
    phoneNumbersLevel2: cleanArrayOrRemove(form.phoneNumbersLevel2),
    phoneNumbersLevel3: cleanArrayOrRemove(form.phoneNumbersLevel3),

    emailRecipientsLevel1: cleanArrayOrRemove(form.emailRecipientsLevel1),
    emailRecipientsLevel2: cleanArrayOrRemove(form.emailRecipientsLevel2),
    emailRecipientsLevel3: cleanArrayOrRemove(form.emailRecipientsLevel3),
  };

  onSubmit(payload); 
};


  // ---------------- Render Modal ----------------
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" title="Add New Sub-Store">
      {topError && (
  <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm font-medium">
    {topError}
  </div>
)}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="Sub-Store Name" name="name" value={form.name} onChange={onChange} required />
          </div>
          <div>
            <Input label="Location" name="location" value={form.location} onChange={onChange} />
          </div>
        </div>
        <div
          onClick={() =>
            onChange({ target: { name: 'notificationStatus', type: 'checkbox', checked: !form.notificationStatus } })
          }
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${form.notificationStatus ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${form.notificationStatus ? 'translate-x-6' : 'translate-x-0'
              }`}
          ></div>
        </div>



        {/* Levels 1,2,3 */}
        {renderDynamicFields(1)}
        {renderDynamicFields(2)}
        {renderDynamicFields(3)}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? 'Update Sub-Store' : 'Create Sub-Store'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubStoreModal;
