import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Language files
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.dashboard': 'Dashboard',
    'nav.meetKalyani': 'Meet Kalyani',
    'nav.community': 'Chaupal',
    'nav.profile': 'Profile',
    'nav.cart': 'Cart',
    'nav.welcome': 'Welcome',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.language': 'Language',
    
    // Farmer Dashboard
    'farmer.title': 'Farmer Dashboard',
    'farmer.subtitle': 'Manage your crops, get AI insights, and grow smarter',
    'farmer.overview': 'Overview',
    'farmer.myCrops': 'My Crops',
    'farmer.cropSuggestion': 'Crop Suggestion',
    'farmer.harvestPrediction': 'Harvest Prediction',
    'farmer.pestDetection': 'Pest Detection',
    'farmer.orders': 'Orders',
    'farmer.totalCrops': 'Total Crops',
    'farmer.approvedCrops': 'Approved Crops',
    'farmer.totalOrders': 'Total Orders',
    'farmer.totalValue': 'Total Value',
    'farmer.recentCrops': 'Recent Crops',
    'farmer.recentOrders': 'Recent Orders',
    'farmer.noCrops': 'No crops listed yet',
    'farmer.noOrders': 'No orders yet',
    'farmer.addNewCrop': 'Add New Crop',
    'farmer.edit': 'Edit',
    'farmer.delete': 'Delete',
    'farmer.cropName': 'Crop Name',
    'farmer.category': 'Category',
    'farmer.quantity': 'Quantity',
    'farmer.price': 'Price',
    'farmer.location': 'Location',
    'farmer.description': 'Description',
    'farmer.vegetables': 'Vegetables',
    'farmer.fruits': 'Fruits',
    'farmer.grains': 'Grains',
    'farmer.pulses': 'Pulses',
    'farmer.spices': 'Spices',
    'farmer.addCrop': 'Add Crop',
    'farmer.updateCrop': 'Update Crop',
    'farmer.cancel': 'Cancel',
    'farmer.ordersReceived': 'Orders Received',
    'farmer.orderId': 'Order ID',
    'farmer.date': 'Date',
    'farmer.items': 'Items',
    'farmer.total': 'Total',
    'farmer.status': 'Status',
    'farmer.approved': 'Approved',
    'farmer.pending': 'Pending',
    'farmer.rejected': 'Rejected',
    'farmer.completed': 'Completed',
    
    // Crop Suggestion
    'cropSuggestion.title': 'AI Crop Suggestion',
    'cropSuggestion.enterDetails': 'Enter Your Farm Details',
    'cropSuggestion.soilType': 'Soil Type',
    'cropSuggestion.climate': 'Climate',
    'cropSuggestion.season': 'Season',
    'cropSuggestion.location': 'Location',
    'cropSuggestion.getSuggestions': 'Get Suggestions',
    'cropSuggestion.analyzing': 'Analyzing...',
    'cropSuggestion.recommendations': 'AI Recommendations',
    'cropSuggestion.fillDetails': 'Fill in your farm details and get AI-powered crop recommendations',
    
    // Harvest Prediction
    'harvestPrediction.title': 'ML Harvest & Production Prediction',
    'harvestPrediction.enterDetails': 'Enter Your Crop Details',
    'harvestPrediction.cropType': 'Crop Type',
    'harvestPrediction.plantingDate': 'Planting Date',
    'harvestPrediction.soilQuality': 'Soil Quality',
    'harvestPrediction.weatherConditions': 'Weather Conditions',
    'harvestPrediction.irrigation': 'Irrigation',
    'harvestPrediction.fertilizer': 'Fertilizer Used',
    'harvestPrediction.predictHarvest': 'Predict Harvest',
    'harvestPrediction.predicting': 'Predicting...',
    'harvestPrediction.results': 'ML Prediction Results',
    'harvestPrediction.fillDetails': 'Enter your crop details and get ML-powered harvest predictions',
    
    // Common
    'common.kg': 'kg',
    'common.perKg': '/kg',
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.finish': 'Finish',
    'common.currency': '₹',
    'common.currencyCode': 'INR',
    
    // Payment
    'payment.title': 'Payment',
    'payment.subtitle': 'Complete your purchase securely',
    'payment.paymentMethod': 'Payment Method',
    'payment.selectMethod': 'Select Payment Method',
    'payment.billingAddress': 'Billing Address',
    'payment.orderSummary': 'Order Summary',
    'payment.processing': 'Processing Payment...',
    'payment.pay': 'Pay',
    'payment.success': 'Payment successful! Your order has been placed.',
    'payment.failed': 'Payment failed. Please try again.',
    'payment.emptyCart': 'Your cart is empty',
    'payment.continueShopping': 'Continue Shopping',
    'payment.proceedToPayment': 'Proceed to Payment'
  },
  
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.marketplace': 'बाजार',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.meetKalyani': 'कल्याणी से मिलें',
    'nav.community': 'चौपाल',
    'nav.profile': 'प्रोफाइल',
    'nav.cart': 'कार्ट',
    'nav.welcome': 'स्वागत है',
    'nav.logout': 'लॉगआउट',
    'nav.login': 'लॉगिन',
    'nav.register': 'रजिस्टर',
    'nav.language': 'भाषा',
    
    // Farmer Dashboard
    'farmer.title': 'किसान डैशबोर्ड',
    'farmer.subtitle': 'अपनी फसलों का प्रबंधन करें, AI अंतर्दृष्टि प्राप्त करें, और स्मार्ट तरीके से खेती करें',
    'farmer.overview': 'अवलोकन',
    'farmer.myCrops': 'मेरी फसलें',
    'farmer.cropSuggestion': 'फसल सुझाव',
    'farmer.harvestPrediction': 'फसल पूर्वानुमान',
    'farmer.pestDetection': 'कीट पहचान',
    'farmer.orders': 'ऑर्डर',
    'farmer.totalCrops': 'कुल फसलें',
    'farmer.approvedCrops': 'अनुमोदित फसलें',
    'farmer.totalOrders': 'कुल ऑर्डर',
    'farmer.totalValue': 'कुल मूल्य',
    'farmer.recentCrops': 'हाल की फसलें',
    'farmer.recentOrders': 'हाल के ऑर्डर',
    'farmer.noCrops': 'अभी तक कोई फसल सूचीबद्ध नहीं',
    'farmer.noOrders': 'अभी तक कोई ऑर्डर नहीं',
    'farmer.addNewCrop': 'नई फसल जोड़ें',
    'farmer.edit': 'संपादित करें',
    'farmer.delete': 'हटाएं',
    'farmer.cropName': 'फसल का नाम',
    'farmer.category': 'श्रेणी',
    'farmer.quantity': 'मात्रा',
    'farmer.price': 'मूल्य',
    'farmer.location': 'स्थान',
    'farmer.description': 'विवरण',
    'farmer.vegetables': 'सब्जियां',
    'farmer.fruits': 'फल',
    'farmer.grains': 'अनाज',
    'farmer.pulses': 'दालें',
    'farmer.spices': 'मसाले',
    'farmer.addCrop': 'फसल जोड़ें',
    'farmer.updateCrop': 'फसल अपडेट करें',
    'farmer.cancel': 'रद्द करें',
    'farmer.ordersReceived': 'प्राप्त ऑर्डर',
    'farmer.orderId': 'ऑर्डर आईडी',
    'farmer.date': 'तारीख',
    'farmer.items': 'आइटम',
    'farmer.total': 'कुल',
    'farmer.status': 'स्थिति',
    'farmer.approved': 'अनुमोदित',
    'farmer.pending': 'लंबित',
    'farmer.rejected': 'अस्वीकृत',
    'farmer.completed': 'पूर्ण',
    
    // Crop Suggestion
    'cropSuggestion.title': 'AI फसल सुझाव',
    'cropSuggestion.enterDetails': 'अपने खेत का विवरण दर्ज करें',
    'cropSuggestion.soilType': 'मिट्टी का प्रकार',
    'cropSuggestion.climate': 'जलवायु',
    'cropSuggestion.season': 'मौसम',
    'cropSuggestion.location': 'स्थान',
    'cropSuggestion.getSuggestions': 'सुझाव प्राप्त करें',
    'cropSuggestion.analyzing': 'विश्लेषण कर रहे हैं...',
    'cropSuggestion.recommendations': 'AI सुझाव',
    'cropSuggestion.fillDetails': 'अपने खेत का विवरण भरें और AI-संचालित फसल सुझाव प्राप्त करें',
    
    // Harvest Prediction
    'harvestPrediction.title': 'ML फसल और उत्पादन पूर्वानुमान',
    'harvestPrediction.enterDetails': 'अपने फसल का विवरण दर्ज करें',
    'harvestPrediction.cropType': 'फसल का प्रकार',
    'harvestPrediction.plantingDate': 'बुवाई की तारीख',
    'harvestPrediction.soilQuality': 'मिट्टी की गुणवत्ता',
    'harvestPrediction.weatherConditions': 'मौसम की स्थिति',
    'harvestPrediction.irrigation': 'सिंचाई',
    'harvestPrediction.fertilizer': 'उपयोग किया गया उर्वरक',
    'harvestPrediction.predictHarvest': 'फसल पूर्वानुमान',
    'harvestPrediction.predicting': 'पूर्वानुमान लगा रहे हैं...',
    'harvestPrediction.results': 'ML पूर्वानुमान परिणाम',
    'harvestPrediction.fillDetails': 'अपने फसल का विवरण दर्ज करें और ML-संचालित फसल पूर्वानुमान प्राप्त करें',
    
    // Common
    'common.kg': 'किलो',
    'common.perKg': '/किलो',
    'common.required': 'आवश्यक',
    'common.optional': 'वैकल्पिक',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.close': 'बंद करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    'common.yes': 'हां',
    'common.no': 'नहीं',
    'common.confirm': 'पुष्टि करें',
    'common.cancel': 'रद्द करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.finish': 'समाप्त',
    'common.currency': '₹',
    'common.currencyCode': 'INR',
    
    // Payment
    'payment.title': 'भुगतान',
    'payment.subtitle': 'अपनी खरीदारी सुरक्षित रूप से पूरी करें',
    'payment.paymentMethod': 'भुगतान विधि',
    'payment.selectMethod': 'भुगतान विधि चुनें',
    'payment.billingAddress': 'बिलिंग पता',
    'payment.orderSummary': 'ऑर्डर सारांश',
    'payment.processing': 'भुगतान प्रसंस्करण...',
    'payment.pay': 'भुगतान करें',
    'payment.success': 'भुगतान सफल! आपका ऑर्डर रखा गया है।',
    'payment.failed': 'भुगतान असफल। कृपया पुनः प्रयास करें।',
    'payment.emptyCart': 'आपकी गाड़ी खाली है',
    'payment.continueShopping': 'खरीदारी जारी रखें',
    'payment.proceedToPayment': 'भुगतान के लिए आगे बढ़ें'
  },
  
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.marketplace': 'சந்தை',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.meetKalyani': 'கல்யாணியை சந்திக்கவும்',
    'nav.community': 'சௌபால்',
    'nav.profile': 'சுயவிவரம்',
    'nav.cart': 'கார்ட்',
    'nav.welcome': 'வரவேற்கிறோம்',
    'nav.logout': 'வெளியேறு',
    'nav.login': 'உள்நுழை',
    'nav.register': 'பதிவு',
    'nav.language': 'மொழி',
    
    // Farmer Dashboard
    'farmer.title': 'விவசாயி டாஷ்போர்டு',
    'farmer.subtitle': 'உங்கள் பயிர்களை நிர்வகிக்கவும், AI நுண்ணறிவைப் பெறவும், மற்றும் புத்திசாலித்தனமாக விவசாயம் செய்யவும்',
    'farmer.overview': 'கண்ணோட்டம்',
    'farmer.myCrops': 'எனது பயிர்கள்',
    'farmer.cropSuggestion': 'பயிர் பரிந்துரை',
    'farmer.harvestPrediction': 'அறுவடை கணிப்பு',
    'farmer.pestDetection': 'பூச்சி கண்டறிதல்',
    'farmer.orders': 'ஆர்டர்கள்',
    'farmer.totalCrops': 'மொத்த பயிர்கள்',
    'farmer.approvedCrops': 'அனுமதிக்கப்பட்ட பயிர்கள்',
    'farmer.totalOrders': 'மொத்த ஆர்டர்கள்',
    'farmer.totalValue': 'மொத்த மதிப்பு',
    'farmer.recentCrops': 'சமீபத்திய பயிர்கள்',
    'farmer.recentOrders': 'சமீபத்திய ஆர்டர்கள்',
    'farmer.noCrops': 'இன்னும் பயிர்கள் பட்டியலிடப்படவில்லை',
    'farmer.noOrders': 'இன்னும் ஆர்டர்கள் இல்லை',
    'farmer.addNewCrop': 'புதிய பயிர் சேர்க்கவும்',
    'farmer.edit': 'திருத்தவும்',
    'farmer.delete': 'நீக்கவும்',
    'farmer.cropName': 'பயிரின் பெயர்',
    'farmer.category': 'வகை',
    'farmer.quantity': 'அளவு',
    'farmer.price': 'விலை',
    'farmer.location': 'இடம்',
    'farmer.description': 'விளக்கம்',
    'farmer.vegetables': 'காய்கறிகள்',
    'farmer.fruits': 'பழங்கள்',
    'farmer.grains': 'தானியங்கள்',
    'farmer.pulses': 'பருப்பு வகைகள்',
    'farmer.spices': 'மசாலாப் பொருட்கள்',
    'farmer.addCrop': 'பயிர் சேர்க்கவும்',
    'farmer.updateCrop': 'பயிரை புதுப்பிக்கவும்',
    'farmer.cancel': 'ரத்து செய்யவும்',
    'farmer.ordersReceived': 'பெறப்பட்ட ஆர்டர்கள்',
    'farmer.orderId': 'ஆர்டர் ஐடி',
    'farmer.date': 'தேதி',
    'farmer.items': 'பொருட்கள்',
    'farmer.total': 'மொத்தம்',
    'farmer.status': 'நிலை',
    'farmer.approved': 'அனுமதிக்கப்பட்டது',
    'farmer.pending': 'நிலுவையில்',
    'farmer.rejected': 'நிராகரிக்கப்பட்டது',
    'farmer.completed': 'முடிந்தது',
    
    // Crop Suggestion
    'cropSuggestion.title': 'AI பயிர் பரிந்துரை',
    'cropSuggestion.enterDetails': 'உங்கள் வயலின் விவரங்களை உள்ளிடவும்',
    'cropSuggestion.soilType': 'மண் வகை',
    'cropSuggestion.climate': 'காலநிலை',
    'cropSuggestion.season': 'பருவம்',
    'cropSuggestion.location': 'இடம்',
    'cropSuggestion.getSuggestions': 'பரிந்துரைகளைப் பெறவும்',
    'cropSuggestion.analyzing': 'பகுப்பாய்வு செய்கிறது...',
    'cropSuggestion.recommendations': 'AI பரிந்துரைகள்',
    'cropSuggestion.fillDetails': 'உங்கள் வயலின் விவரங்களை நிரப்பி AI-இயக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெறவும்',
    
    // Harvest Prediction
    'harvestPrediction.title': 'ML அறுவடை மற்றும் உற்பத்தி கணிப்பு',
    'harvestPrediction.enterDetails': 'உங்கள் பயிரின் விவரங்களை உள்ளிடவும்',
    'harvestPrediction.cropType': 'பயிர் வகை',
    'harvestPrediction.plantingDate': 'நடவு தேதி',
    'harvestPrediction.soilQuality': 'மண் தரம்',
    'harvestPrediction.weatherConditions': 'வானிலை நிலைமைகள்',
    'harvestPrediction.irrigation': 'நீர்ப்பாசனம்',
    'harvestPrediction.fertilizer': 'பயன்படுத்தப்பட்ட உரம்',
    'harvestPrediction.predictHarvest': 'அறுவடை கணிப்பு',
    'harvestPrediction.predicting': 'கணிக்கிறது...',
    'harvestPrediction.results': 'ML கணிப்பு முடிவுகள்',
    'harvestPrediction.fillDetails': 'உங்கள் பயிரின் விவரங்களை உள்ளிட்டு ML-இயக்கப்பட்ட அறுவடை கணிப்புகளைப் பெறவும்',
    
    // Common
    'common.kg': 'கிலோ',
    'common.perKg': '/கிலோ',
    'common.required': 'தேவை',
    'common.optional': 'விருப்பத்தேர்வு',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.cancel': 'ரத்து செய்யவும்',
    'common.save': 'சேமிக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.delete': 'நீக்கவும்',
    'common.close': 'மூடவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.warning': 'எச்சரிக்கை',
    'common.info': 'தகவல்',
    'common.yes': 'ஆம்',
    'common.no': 'இல்லை',
    'common.confirm': 'உறுதிப்படுத்தவும்',
    'common.cancel': 'ரத்து செய்யவும்',
    'common.back': 'பின்',
    'common.next': 'அடுத்து',
    'common.finish': 'முடிக்கவும்',
    'common.currency': '₹',
    'common.currencyCode': 'INR',
    
    // Payment
    'payment.title': 'பணம் செலுத்துதல்',
    'payment.subtitle': 'உங்கள் வாங்குதலை பாதுகாப்பாக முடிக்கவும்',
    'payment.paymentMethod': 'பணம் செலுத்தும் முறை',
    'payment.selectMethod': 'பணம் செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும்',
    'payment.billingAddress': 'பில் முகவரி',
    'payment.orderSummary': 'ஆர்டர் சுருக்கம்',
    'payment.processing': 'பணம் செலுத்துதல் செயலாக்கப்படுகிறது...',
    'payment.pay': 'பணம் செலுத்தவும்',
    'payment.success': 'பணம் செலுத்துதல் வெற்றிகரமாக! உங்கள் ஆர்டர் வைக்கப்பட்டது.',
    'payment.failed': 'பணம் செலுத்துதல் தோல்வி. மீண்டும் முயற்சிக்கவும்.',
    'payment.emptyCart': 'உங்கள் கார்ட் காலியாக உள்ளது',
    'payment.continueShopping': 'வாங்குதலைத் தொடரவும்',
    'payment.proceedToPayment': 'பணம் செலுத்துவதற்கு முன்னேறவும்'
  }
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || translations['en'][key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
      { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
    ]
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};