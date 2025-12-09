// src/components/UserInfoForm/UserInfoForm.tsx
import React, { useState, useMemo } from 'react';
import styles from './UserInfoForm.module.css';
import { ALL_COUNTRIES } from '../../utils/countryData'; // Import data
import type {  Country } from '../../utils/countryData'; // Import data

// --- Data Definitions ---
const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55+'];


// --- Component Interface ---
interface UserInfo {
    name: string;
    email: string;
    ageGroup: string;
    gender: 'Male' | 'Female' | '';
    nationality: string; // Country name
    phoneCode: string; // Automatically set phone code
    phoneNumber: string; // The number part
}

interface UserInfoFormProps {
    onInfoChange: (userInfo: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onInfoChange }) => {
    // Initialize full state object
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        email: '',
        ageGroup: '',
        gender: '',
        nationality: '',
        phoneCode: '',
        phoneNumber: ''
    });

    const [nationalityFilter, setNationalityFilter] = useState('');

    // --- Universal Input Handler ---
    const updateInfo = (key: keyof UserInfo, value: string | Country) => {
        const newInfo = { ...userInfo };

        if (key === 'nationality' && typeof value !== 'string') {
            // Special handling if a Country object is passed (on select)
            newInfo.nationality = value.name;
            newInfo.phoneCode = value.phone;
            setNationalityFilter(value.name); // Keep filter text updated
        } else {
            // General string update
            (newInfo as any)[key] = value;
        }

        setUserInfo(newInfo);
        onInfoChange(newInfo);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInfo(e.target.id as keyof UserInfo, e.target.value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateInfo(e.target.id as keyof UserInfo, e.target.value);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInfo('gender', e.target.value as 'Male' | 'Female');
    };

    const handleNationalityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNationalityFilter(value);

        // Check if the typed value matches a country name exactly (on blur/enter)
        const matchedCountry = ALL_COUNTRIES.find(c => c.name.toLowerCase() === value.toLowerCase());
        
        if (matchedCountry) {
            updateInfo('nationality', matchedCountry);
        } else {
            // Clear nationality and phone code if the input doesn't match a valid country
            updateInfo('nationality', '');
            updateInfo('phoneCode', '');
        }
    };
    
    // Filter the countries list based on user input
    const filteredCountries = useMemo(() => {
        return ALL_COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(nationalityFilter.toLowerCase())
        );
    }, [nationalityFilter]);


    const currentFlag = ALL_COUNTRIES.find(c => c.name === userInfo.nationality)?.flag || '🌍';

    return (
        <div className={styles.formContainer}>
            {/* Row 1: Name and Email */}
            <div className={styles.inputGroup}>
                <label htmlFor="name">Your Name:</label>
                <input
                    id="name"
                    type="text"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address:</label>
                <input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                />
            </div>

            {/* Row 2: Age Group and Gender */}
            <div className={styles.inputGroup}>
                <label htmlFor="ageGroup">Age Group:</label>
                <select
                    id="ageGroup"
                    value={userInfo.ageGroup}
                    onChange={handleSelectChange}
                    required
                >
                    <option value="" disabled>Select Age Group</option>
                    {AGE_GROUPS.map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Gender:</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={userInfo.gender === 'Male'}
                            onChange={handleGenderChange}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={userInfo.gender === 'Female'}
                            onChange={handleGenderChange}
                        />
                        Female
                    </label>
                </div>
            </div>

            {/* Row 3: Nationality (Filterable) */}
            <div className={styles.inputGroup}>
                <label htmlFor="nationality">Nationality:</label>
                <div className={styles.comboboxWrapper}>
                    <input
                        type="text"
                        list="nationality-list"
                        id="nationality-input"
                        value={nationalityFilter}
                        onChange={handleNationalityInput}
                        onBlur={handleNationalityInput} // Check on blur
                        placeholder="Type to find your nationality"
                        required
                    />
                    <span className={styles.flagIcon}>{currentFlag}</span>
                    <datalist id="nationality-list">
                        {filteredCountries.map(c => (
                            <option key={c.code} value={c.name}>
                                {c.flag} {c.name}
                            </option>
                        ))}
                    </datalist>
                </div>
            </div>

            {/* Row 3: Phone Number */}
            <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <div className={styles.phoneNumberWrapper}>
                    <span className={styles.phoneCodeDisplay}>
                        +{userInfo.phoneCode || '00'}
                    </span>
                    <input
                        id="phoneNumber"
                        type="tel"
                        value={userInfo.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter number"
                        required
                        disabled={!userInfo.phoneCode}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserInfoForm;