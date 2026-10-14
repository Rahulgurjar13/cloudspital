export interface ProductDetails {
  slug: string;
  tagline: string;
  category:"Health Kiosks" | "Telemedicine Carts" | "Portable Kits" | "Mobile Units";
  vitals: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: Record<string, Record<string, string>>;
  certifications: string[];
  applications: string[];
  abdmCompliant: boolean;
}

export const PRODUCT_REGISTRY: Record<string, ProductDetails> = {
  "health-kiosk": {
    slug: "health-kiosk",
    tagline:"AI Powered Support Experience - AI powered suggestions",
    category:"Health Kiosks",
    abdmCompliant: true,
    vitals: [
      "Non Invasive Tests",
      "Invasive Tests",
      "Urine Check Up Parameters",
      "ENT Check Up (Otoscopy)",
      "Dermatology Inspections",
      "Heart Disease Related Parameters",
      "Mothercare Check Ups",
      "RDT Tests (AI Based Automated Reader)",
    ],
    features: [
      {
        title:"AI Powered Support",
        description:"Innovative screening support featuring AI powered diagnostic suggestions and clinical decision support.",
        icon: "Cpu",
      },
      {
        title:"Patient Load Relief",
        description:"Democratizing healthcare with kiosks to relieve skew patient load burden in hospitals and public health centers.",
        icon: "ShieldAlert",
      },
      {
        title:"Rural Access Bridge",
        description:"Providing alternative points of care in remote and rural locations to counter doctor patient imbalances.",
        icon: "Activity",
      },
      {
        title:"Clinical Staff Empowerment",
        description:"Empowering local clinical staff with efficient, tech driven point of care tools for streamlined delivery.",
        icon: "Video",
      },
    ],
    specifications: {
      "Key Benefits": {
        "Rapid Health Screening": "Full-body health screening completed within minutes for convenient assessments.",
        "On-the-Spot Reporting": "Instantaneous diagnostic reports and health summaries for timely clinical insights.",
        "Virtual Consultations": "Integrated telemedicine platform enabling real-time consultations with remote specialists.",
        "Monitoring Suite": "Comprehensive health monitoring through an extensive suite of 31+ test and screening parameters.",
        "Agnostic Access": "Seamless online/offline functionality ensuring uninterrupted healthcare access in any connectivity scenario.",
        "Insights Platform": "Data-driven analytics dashboard empowering decision makers with real-time health metrics.",
      },
      "Clinical Credentials": {
        "AIIMS Developed": "Developed at the prestigious All India Institute of Medical Sciences (AIIMS) and sandbox integrated.",
        "Portal Integrations": "Directly integrated with the national E-Sanjeevani Telemedicine Portal and NDHM Sandbox.",
        "Regulatory Compliances": "CDSCO NoC approved and Point-of-Care Testing (PoCT) device requiring no additional licensing.",
        "Specialized Tests": "Offers on-demand HbA1c and Lipid Profile testing capabilities along with comprehensive screening.",
      },
    },
    certifications: ["CDSCO NoC Approved", "ABDM Compliant", "CE Certified", "ISO 13485", "Made in India", "Startup India Certified"],
    applications: [
      "Rural PHCs and Ayushman Arogya Mandirs",
      "Government and Public Hospitals",
      "Corporate Wellness Centers",
      "Railway Stations and Transit Hubs",
      "Gated Communities and Old Age Homes",
    ],
  },
  "medsync-iii-tele-icu-kiosk": {
    slug: "medsync-iii-tele-icu-kiosk",
    tagline:"960+ INSTALLATIONS PAN INDIA",
    category:"Health Kiosks",
    abdmCompliant: true,
    vitals: [
      "Non Invasive Tests",
      "Invasive Tests",
      "Urine Check Up Parameters",
      "ENT Check Up (Otoscopy)",
      "Dermatology Inspections",
      "Heart Disease Related Parameters",
      "Mothercare Check Ups",
      "RDT Tests (AI Based Automated Reader)",
    ],
    features: [
      {
        title:"Pan India Deployment",
        description:"Clinical grade Tele ICU kiosk trusted in over 960+ installations across healthcare networks in India.",
        icon: "LayoutGrid",
      },
      {
        title:"GSM and Wi Fi Enabled",
        description:"Built in GSM module for uninterrupted cell connectivity alongside standard medical Wi Fi and LAN.",
        icon: "Video",
      },
      {
        title:"Standard Warranty",
        description:"Includes a 5 year standard warranty reflecting premium industrial grade construction.",
        icon: "Shield",
      },
      {
        title:"Touch Screen Interface",
        description:"Intuitively touch operated for simple clinic workflows and easy bedside navigation.",
        icon: "Activity",
      },
    ],
    specifications: {
      "Hardware Configuration": {
        "Display": "Touch Operated Medical Grade Screen",
        "Connectivity":"In built GSM Module and Dual band Wi Fi/Ethernet",
        "Audio":"Integrated Speaker and High Fidelity Microphone System",
        "Power Backup": "In-built battery backup for emergency outages",
        "Printer":"Built in A4 Document Printer",
        "Warranty":"5 Year Standard Warranty",
      },
      "Clinical Diagnostics": {
        "POCT Compatibility": "Supports Point-of-Care Testing (POCT) modules",
        "Medical Instruments": "Integrated multi-parameter clinical testing hub",
      },
    },
    certifications: ["CDSCO Approved Diagnostics", "ABDM Level 1 and 2 Compliant", "CE Mark", "ISO 13485"],
    applications: [
      "ICU Spokes and Bedside Tele presence",
      "Rural PHCs and CHCs",
      "Pediatric Care (Tele PICU)",
      "Emergency and Trauma Rooms",
    ],
  },
  "medsync-iv-telemedicine-poct-cart": {
    slug: "medsync-iv-telemedicine-poct-cart",
    tagline:"Telemedicine and PoCT CART For OPD Monitoring",
    category:"Telemedicine Carts",
    abdmCompliant: true,
    vitals: [
      "Non Invasive Tests",
      "Invasive Tests",
      "Urine Check Up Parameters",
      "ENT Check Up (Otoscopy)",
      "Dermatology Inspections",
      "Heart Disease Related Parameters",
      "Mothercare Check Ups",
      "RDT Tests (AI Based Automated Reader)",
    ],
    features: [
      {
        title:"OPD Telemedicine Cart",
        description:"Optimized mobile cart configured specifically for outpatient department monitoring and diagnostic reviews.",
        icon: "Pocket",
      },
      {
        title:"Webcam Array",
        description:"Equipped with 4 different integrated webcams to support multi angle physical examinations and consults.",
        icon: "Camera",
      },
      {
        title:"Document and X Ray Scanner",
        description:"Built in scanner allows bedside sharing of physical documents, medical records, or film based X Rays.",
        icon: "LayoutGrid",
      },
      {
        title:"GSM Telemetry",
        description:"In built GSM connectivity module ensures independent network access outside hospital LANs.",
        icon: "Activity",
      },
    ],
    specifications: {
      "Hardware and Build": {
        "Input Operation": "Keyboard and Mouse Operated Console",
        "Imaging":"4 different integrated webcams for comprehensive coverage",
        "Scanner":"In built Document and X Ray Film Scanner",
        "Audio":"Integrated speaker and array microphone system",
        "Connectivity":"In built GSM Module + Medical Wi Fi/Ethernet",
        "Power Backup": "In-built battery backup for mobile clinical rounds",
        "Warranty":"5 Year Standard Warranty",
      },
      "Diagnostics Integration": {
        "POCT Compatibility": "Supports Point-of-Care Testing (POCT) blood and chemistry devices",
        "Storage":"Lockable device drawers and accessory baskets",
      },
    },
    certifications: ["CE Certified", "ABDM Compliant", "IEC 60601-1-2 EMC Compliant"],
    applications: [
      "Outpatient OPD Clinics",
      "Inpatient Bedside Rounds",
      "Community Outreach Campaigns",
      "General Consultation Rooms",
    ],
  },
  "medsync-v-telemedicine-cart-icu": {
    slug: "medsync-v-telemedicine-cart-icu",
    tagline:"Telemedicine Cart For ICU Level- 1 Monitoring",
    category:"Telemedicine Carts",
    abdmCompliant: false,
    vitals: [
      "Patient Bedside Vital Mirroring",
      "Multi angle Video Consultation Feed",
      "Bedside Telemetry Log Syncing",
    ],
    features: [
      {
        title:"20x PTZ Camera",
        description:"Equipped with a high end 20x Optical Zoom PTZ camera for detailed diagnostic inspections by remote intensivists.",
        icon: "Camera",
      },
      {
        title:"Triple Webcam Array",
        description:"Features 3 different webcams to capture patient status, room environment, and active ventilator screens simultaneously.",
        icon: "Video",
      },
      {
        title:"GSM and Wi Fi Telemetry",
        description:"Supports in built GSM module connectivity alongside standard secure clinical networks.",
        icon: "Activity",
      },
      {
        title:"Standard Warranty",
        description:"Guaranteed longevity with a 5 year standard manufacturer warranty.",
        icon: "Shield",
      },
    ],
    specifications: {
      "Imaging and Controls": {
        "PTZ Camera": "20x Optical Zoom PTZ Camera on articulating mount",
        "Auxiliary Imaging": "3 different integrated webcams",
        "Input Console": "Keyboard Operated medical station",
        "Audio":"In built speaker and directional microphone",
      },
      "Connectivity and Power": {
        "GSM Telemetry": "In-built GSM Module",
        "Network Interfaces": "Wi-Fi and Gigabit Ethernet RJ45",
        "Power Setup": "In-built battery backup system",
        "Warranty":"5 Year Standard Warranty",
      },
      "Diagnostics": {
        "POCT Compatibility": "No POCT testing modules (focused purely on Level-1 telemetry and vitals mirroring)",
      },
    },
    certifications: ["EN 60601-1 Safety", "ISO 13485", "CE Mark"],
    applications: [
      "Level 1 Intensive Care Units (ICU)",
      "Cardiac Care Units (CCU)",
      "High Dependency Units (HDU)",
      "Remote Specialist Ward Rounds",
    ],
  },
  "medsync-vi-telemedicine-poct-cart-icu": {
    slug: "medsync-vi-telemedicine-poct-cart-icu",
    tagline:"TELEMEDICINE AND POCT CART FOR ICU MONITORING",
    category:"Telemedicine Carts",
    abdmCompliant: true,
    vitals: [
      "Non Invasive Tests",
      "Invasive Tests",
      "Urine Check Up Parameters",
      "ENT Check Up (Otoscopy)",
      "Dermatology Inspections",
      "Heart Disease Related Parameters",
      "Mothercare Check Ups",
      "RDT Tests (AI Based Automated Reader)",
    ],
    features: [
      {
        title:"ICU POCT and Telemetry",
        description:"The ultimate critical care cart combining advanced remote ICU telemetry with a comprehensive dry chemistry lab.",
        icon: "LayoutGrid",
      },
      {
        title:"20x PTZ Camera",
        description:"Includes a 20x Optical Zoom PTZ camera to perform detailed bedside checks and consults remotely.",
        icon: "Camera",
      },
      {
        title:"Touch Operated",
        description:"Features a modern, touch operated interface optimized for emergency care and quick diagnostics.",
        icon: "Activity",
      },
      {
        title:"Built in GSM",
        description:"In built GSM module ensures redundant connectivity for streaming continuous telemetry logs.",
        icon: "Video",
      },
    ],
    specifications: {
      "Hardware Specs": {
        "Control Interface": "Touch Operated Medical Panel",
        "PTZ Camera": "20x Optical Zoom PTZ camera",
        "Auxiliary Cameras": "3 different auxiliary webcams",
        "Audio":"In built Speaker and Microphone system",
        "Power Backup": "In-built battery backup system",
        "Warranty":"5 Year Standard Warranty",
      },
      "Diagnostics and Connections": {
        "POCT Testing": "Fully integrated dry-chemistry POCT analyzers",
        "Network":"In built GSM Module + Wi Fi and Ethernet",
      },
    },
    certifications: ["CE Mark", "CDSCO Approved Diagnostics", "ABDM Level 2 Compliant", "IEC 60601-1"],
    applications: [
      "Critical Care Units (ICU)",
      "Emergency Trauma Triage",
      "Neonatal and Pediatric Care (NICU/PICU)",
      "Remote Critical Care Consulting Hubs",
    ],
  },
  "medsync-ii-telemedicine-cart": {
    slug: "medsync-ii-telemedicine-cart",
    tagline:"Reverb Lifesciences Private Limited - A cloudspital company",
    category:"Telemedicine Carts",
    abdmCompliant: false,
    vitals: [
      "Blood Pressure (NIBP)",
      "Pulse Oximetry (SpO2)",
      "Pulse Rate",
      "Body Temperature (IR)",
    ],
    features: [
      {
        title:"Reverb Lifesciences",
        description:"Designed and manufactured by Reverb Lifesciences, a proud subsidiary of the Cloudspital brand.",
        icon: "Cpu",
      },
      {
        title:"Agile Profile",
        description:"Slim, lightweight mobile cart with locked castors designed for fast bedside ward rounds.",
        icon: "Activity",
      },
      {
        title:"Four Vitals checked",
        description:"Directly records and logs core vitals parameters: BP, SpO2, Pulse Rate, and Temperature.",
        icon: "Video",
      },
      {
        title:"Standard Warranty",
        description:"Comes with a 1 year standard warranty on all structural and electronic components.",
        icon: "Shield",
      },
    ],
    specifications: {
      "Hardware Specs": {
        "Input Control": "Keyboard Operated medical stand",
        "Vitals Recorded": "Blood Pressure, SpO2, Pulse Rate and Temperature",
        "Audio":"In built Speaker and Microphone system",
        "Connectivity":"In built GSM Module + Wi Fi",
        "Warranty":"1 Year Standard Warranty",
      },
    },
    certifications: ["CE Mark", "RoHS Compliant"],
    applications: [
      "Routine Bedside Ward Rounds",
      "Bedside Patient Registration",
      "Virtual Family Consultations",
      "General Clinical Inquiries",
    ],
  },
  "medsync-i-portable-telemedicine-bag": {
    slug: "medsync-i-portable-telemedicine-bag",
    tagline:"Reverb Lifesciences Private Limited - A cloudspital company",
    category:"Portable Kits",
    abdmCompliant: true,
    vitals: [
      "Blood Pressure (NIBP)",
      "Pulse Oximetry (SpO2)",
      "Pulse Rate",
      "Body Temperature (IR)",
    ],
    features: [
      {
        title:"Portable Suitcase Bag",
        description:"Ruggedized emergency diagnostic kit built inside a durable military grade carrying suitcase.",
        icon: "Cpu",
      },
      {
        title:"Reverb Lifesciences",
        description:"Designed and manufactured by Reverb Lifesciences, a proud subsidiary of the Cloudspital brand.",
        icon: "ShieldAlert",
      },
      {
        title:"Four Vitals checked",
        description:"Compact USB sensors to measure and record BP, SpO2, Pulse Rate, and Temperature on the spot.",
        icon: "Activity",
      },
      {
        title:"Standard Warranty",
        description:"Comes with a 1 year standard warranty on all components.",
        icon: "Shield",
      },
    ],
    specifications: {
      "Hardware Configuration": {
        "Case":"Ruggedized carrying suitcase",
        "Input Control": "Keyboard Operated tablet panel",
        "Vitals Recorded": "Blood Pressure, SpO2, Pulse Rate and Temperature",
        "Audio":"In built Speaker and Microphone system",
        "Connectivity":"In built GSM Module + Wi Fi",
        "Warranty":"1 Year Standard Warranty",
      },
    },
    certifications: ["ABDM Compliant", "CE Certified Diagnostics", "MIL-STD-810G Case"],
    applications: [
      "Rural Outreach Health Camps",
      "Emergency Disaster Relief",
      "Home Health Consultation Visits",
      "Military Field Medicine",
    ],
  },
  "mobile-medical-unit": {
    slug: "mobile-medical-unit",
    tagline:"Fully customized medical clinic on wheels for rural outreach and CSR initiatives",
    category:"Mobile Units",
    abdmCompliant: true,
    vitals: [
      "Complete Health Kiosk Vitals Suite",
      "Primary Care Examination Vitals",
      "On Board Rapid Lab Chemical Panels",
    ],
    features: [
      {
        title:"Customized Clinic Coach",
        description:"State of the art medical clinic built inside a Mercedes Benz Sprinter or Force Traveller coach.",
        icon: "Cpu",
      },
      {
        title:"Off Grid Solar Setup",
        description:"Equipped with roof mounted solar panels, lithium power banks, and silent backup generator.",
        icon: "Activity",
      },
      {
        title:"On Board Mini Laboratory",
        description:"Features a centrifuge, medical refrigerator, and rapid POCT diagnostics for comprehensive labs.",
        icon: "Video",
      },
      {
        title:"Climate Control HEPA",
        description:"Integrated dual zone climate control with HEPA filtration to maintain pristine clinical air.",
        icon: "Shield",
      },
    ],
    specifications: {
      "Vehicle and Shell": {
        "Platform Vehicle": "Mercedes-Benz Sprinter Cargo / Force Traveller Chassis",
        "HVAC System": "Clinical AC with HEPA air filtration system",
        "Layout Spaces": "Driver compartment, Consultation area, Mini-laboratory bay",
      },
      "Power Infrastructure": {
        "Solar Panel Array": "Roof-mounted solar panel array",
        "Battery Bank": "Lithium Iron Phosphate battery storage bank",
        "Backup Power": "Silent diesel generator with transfer switch",
      },
      "Clinical Equipment": {
        "Health Kiosk": "Built-in Cloudspital Point-of-Care Health Kiosk",
        "Patient Bed": "Adjustable patient examination bed",
        "Cold Chain Storage": "Medical grade vaccine refrigerator",
      },
    },
    certifications: ["AIS-125 Compliant Coach", "ABDM Compliant Clinic", "CE Certified Equipment"],
    applications: [
      "Corporate CSR Rural Outreaches",
      "Urban Slum Primary Care Clinics",
      "Disaster Relief Operations",
      "Community Immunization Campaigns",
    ],
  },
};
