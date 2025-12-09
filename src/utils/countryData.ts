// src/utils/countryData.ts

export interface Country {
    name: string;
    code: string; // ISO 3166-1 alpha-2 code
    flag: string; // Emoji flag
    phone: string; // Phone code prefix
}

// A built-in, extensive list of countries with flag emojis and phone codes
export const ALL_COUNTRIES: Country[] = [
    { name: "Afghanistan", code: "AF", flag: "🇦🇫", phone: "93" },
    { name: "Albania", code: "AL", flag: "🇦🇱", phone: "355" },
    { name: "Algeria", code: "DZ", flag: "🇩🇿", phone: "213" },
    { name: "Andorra", code: "AD", flag: "🇦🇩", phone: "376" },
    { name: "Angola", code: "AO", flag: "🇦🇴", phone: "244" },
    { name: "Argentina", code: "AR", flag: "🇦🇷", phone: "54" },
    { name: "Australia", code: "AU", flag: "🇦🇺", phone: "61" },
    { name: "Austria", code: "AT", flag: "🇦🇹", phone: "43" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭", phone: "973" },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩", phone: "880" },
    { name: "Belgium", code: "BE", flag: "🇧🇪", phone: "32" },
    { name: "Brazil", code: "BR", flag: "🇧🇷", phone: "55" },
    { name: "Canada", code: "CA", flag: "🇨🇦", phone: "1" },
    { name: "Chile", code: "CL", flag: "🇨🇱", phone: "56" },
    { name: "China", code: "CN", flag: "🇨🇳", phone: "86" },
    { name: "Colombia", code: "CO", flag: "🇨🇴", phone: "57" },
    { name: "Denmark", code: "DK", flag: "🇩🇰", phone: "45" },
    { name: "Egypt", code: "EG", flag: "🇪🇬", phone: "20" },
    { name: "France", code: "FR", flag: "🇫🇷", phone: "33" },
    { name: "Germany", code: "DE", flag: "🇩🇪", phone: "49" },
    { name: "Greece", code: "GR", flag: "🇬🇷", phone: "30" },
    { name: "India", code: "IN", flag: "🇮🇳", phone: "91" },
    { name: "Indonesia", code: "ID", flag: "🇮🇩", phone: "62" },
    { name: "Ireland", code: "IE", flag: "🇮🇪", phone: "353" },
    { name: "Israel", code: "IL", flag: "🇮🇱", phone: "972" },
    { name: "Italy", code: "IT", flag: "🇮🇹", phone: "39" },
    { name: "Japan", code: "JP", flag: "🇯🇵", phone: "81" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼", phone: "965" },
    { name: "Mexico", code: "MX", flag: "🇲🇽", phone: "52" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱", phone: "31" },
    { name: "New Zealand", code: "NZ", flag: "🇳🇿", phone: "64" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬", phone: "234" },
    { name: "Norway", code: "NO", flag: "🇳🇴", phone: "47" },
    { name: "Oman", code: "OM", flag: "🇴🇲", phone: "968" },
    { name: "Pakistan", code: "PK", flag: "🇵🇰", phone: "92" },
    { name: "Portugal", code: "PT", flag: "🇵🇹", phone: "351" },
    { name: "Qatar", code: "QA", flag: "🇶🇦", phone: "974" },
    { name: "Russia", code: "RU", flag: "🇷🇺", phone: "7" },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", phone: "966" },
    { name: "Singapore", code: "SG", flag: "🇸🇬", phone: "65" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦", phone: "27" },
    { name: "South Korea", code: "KR", flag: "🇰🇷", phone: "82" },
    { name: "Spain", code: "ES", flag: "🇪🇸", phone: "34" },
    { name: "Sweden", code: "SE", flag: "🇸🇪", phone: "46" },
    { name: "Switzerland", code: "CH", flag: "🇨🇭", phone: "41" },
    { name: "Turkey", code: "TR", flag: "🇹🇷", phone: "90" },
    { name: "UAE", code: "AE", flag: "🇦🇪", phone: "971" },
    { name: "UK", code: "GB", flag: "🇬🇧", phone: "44" },
    { name: "USA", code: "US", flag: "🇺🇸", phone: "1" },
    // Add many more countries here...
].sort((a, b) => a.name.localeCompare(b.name));