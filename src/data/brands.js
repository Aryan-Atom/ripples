import { IMAGE_BASE } from './site'

const client = (file, name) => ({
  src: `${IMAGE_BASE}/admin/Dashboard/client/${file}`,
  alt: name,
})

export const BRAND_LOGOS = [
  client('1484816317_SAIL-Logo-1.jpg', 'Steel Authority of India'),
  client('1280px-State_Bank_of_India_logo.svg.png', 'State Bank of India'),
  client('IndianOil_Logo_Fulla.jpg', 'Indian Oil'),
  client('1200px-BHEL_logo.svg.png', 'BHEL'),
  client('National_Thermal_Power_logo.svg.png', 'NTPC'),
  client('RBI-Emblem-PNG.png', 'Reserve Bank of India'),
  client('Hindustan_Unilever_Limited_alt.png', 'Hindustan Unilever'),
  client('wipro-new-logo-AE49EC166D-seeklogo.com.png', 'Wipro'),
  client('pimpri-chinchwad-municipal-corporation-largex5-logo.png', 'PCMC Pune'),
  client('Citibank_logo.png', 'Citibank'),
  client('Bank-of-Baroda-logo.png', 'Bank of Baroda'),
  client('larsen-toubro-vector-logo.png', 'Larsen & Toubro'),
  client('mahindra-logo-1024x623-1584868456.jpg', 'Mahindra'),
  client('DLF-logo-7E2CBA06DC-seeklogo.com.png', 'DLF'),
  client('Jaypee_Group_Logo.svg.png', 'Jaypee Group'),
  client('Abu_Dhabi_Airport_logo.svg.png', 'Abu Dhabi Airport'),
  client('Chennai_Corporation_Emblem.png', 'Chennai Corporation'),
  client('313074-ndmc-logoc8bb.png', 'NDMC'),
  client('british-high-commission-780x405.jpg', 'British High Commission'),
  client('POWERGRID0.jpg', 'Power Grid Corporation'),
]
