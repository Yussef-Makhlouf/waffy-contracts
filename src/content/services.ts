export type ServiceIcon = "building" | "city" | "infrastructure" | "water" | "electrical" | "roads" | "finishing" | "restoration" | "landscape" | "management";
export interface Service {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  focus: string;
  icon: ServiceIcon;
  group: "construction" | "infrastructure" | "architecture";
  approvalStatus: "pending";
}

export const services: Service[] = [
  { id: "general-contracting", number: "01", title: "المقاولات العامة وأعمال البناء", short: "من المخطط إلى واقع متكامل، تبدأ رحلة البناء.", description: "يضم هذا المجال المقترح تنسيق أعمال البناء ومراحلها، وربط المتطلبات المعمارية والإنشائية بخطة تنفيذ واضحة. يُحدَّد نطاق الأعمال بعد مراجعة المخططات واحتياجات المشروع.", focus: "تكامل الأعمال وتنظيم مراحل البناء", icon: "building", group: "construction", approvalStatus: "pending" },
  { id: "residential-commercial", number: "02", title: "المباني السكنية والتجارية", short: "مساحات مصمّمة للحياة، وبيئات تدعم الأعمال.", description: "تصوّر لخدمات إنشاء المباني السكنية والتجارية وفق استخدام كل مساحة ومتطلبات التصميم. تبدأ مناقشة المشروع بفهم طبيعة المبنى واحتياجات المستخدمين، ثم تحديد نطاق التنفيذ الممكن اعتماده.", focus: "احتياج المكان وجودة الاستخدام", icon: "city", group: "construction", approvalStatus: "pending" },
  { id: "infrastructure", number: "03", title: "أعمال البنية التحتية", short: "ما تحت السطح يصنع قوة ما فوقه.", description: "مجال مقترح لأعمال تهيئة المواقع والبنية الأساسية المرتبطة بالمشروع. يتطلب تحديد نطاقه دراسة الموقع والتنسيق مع المخططات والجهات ذات العلاقة، وتأكيد المتطلبات قبل التنفيذ.", focus: "تهيئة مدروسة وتنسيق بين التخصصات", icon: "infrastructure", group: "infrastructure", approvalStatus: "pending" },
  { id: "water-sewage", number: "04", title: "شبكات المياه والصرف الصحي", short: "ربطٌ مدروس لخدمات أساسية تدوم.", description: "عرض مبدئي لأعمال شبكات المياه والصرف الصحي وما يرتبط بها من أعمال مدنية. يُراجَع المسار والأحمال ونقاط الربط والمتطلبات الفنية ضمن نطاق معتمد خاص بكل مشروع.", focus: "وضوح المسارات ونقاط الاتصال", icon: "water", group: "infrastructure", approvalStatus: "pending" },
  { id: "electromechanical", number: "05", title: "الأعمال الكهربائية والميكانيكية", short: "تكامل الأنظمة لبيئة أكثر كفاءة.", description: "تصنيف مقترح لتنسيق الأعمال الكهربائية والميكانيكية مع بقية عناصر المبنى. تعتمد تفاصيل الخدمة وتخصصاتها على مراجعة الشركة للمخططات والقدرات المتاحة واحتياجات المشروع.", focus: "تنسيق الأنظمة مع التصميم والتنفيذ", icon: "electrical", group: "infrastructure", approvalStatus: "pending" },
  { id: "roads-pavements", number: "06", title: "أعمال الطرق والأرصفة", short: "مسارات تصل الأماكن وتُكمل المشهد.", description: "مجال مقترح للأعمال المرتبطة بالطرق والأرصفة داخل نطاق المشاريع. تُحدَّد متطلبات التهيئة والمناسيب والخامات والتشطيبات المناسبة بعد دراسة الاستخدام والمخططات.", focus: "انسيابية الحركة وتكامل المناسيب", icon: "roads", group: "infrastructure", approvalStatus: "pending" },
  { id: "architectural-finishing", number: "07", title: "التشطيبات والأعمال المعمارية", short: "تفاصيل تمنح كل مساحة شخصيتها.", description: "تصوّر لأعمال التشطيب التي تصل بين الفكرة المعمارية وتجربة المكان. تتم مناقشة الخامات والأسطح والتفاصيل بالتوافق مع التصميم والميزانية ونطاق العمل الذي تعتمده الشركة.", focus: "تناسق الخامات ودقة التفاصيل", icon: "finishing", group: "architecture", approvalStatus: "pending" },
  { id: "restoration", number: "08", title: "الترميم وإعادة التأهيل", short: "قراءة جديدة للمكان، واحترام لما يحمله.", description: "مجال مقترح لتحديث المباني وتأهيل المساحات القائمة. تسبق أي أعمال مراجعة لحالة المبنى واحتياجاته، وتحديد ما يتطلب تقييمًا متخصصًا قبل الاتفاق على التدخلات الممكنة.", focus: "فهم المبنى قبل التدخل", icon: "restoration", group: "architecture", approvalStatus: "pending" },
  { id: "external-works", number: "09", title: "أعمال المواقع الخارجية", short: "المساحة خارج المبنى امتداد لتجربته.", description: "تصنيف مقترح للأعمال الخارجية المحيطة بالمباني، مع مراعاة الاستخدام والحركة والمناسيب والعلاقة بالواجهات. تُعتمَد العناصر والخامات ونطاق الأعمال بصورة مستقلة لكل مشروع.", focus: "ترابط المبنى ومحيطه", icon: "landscape", group: "architecture", approvalStatus: "pending" },
  { id: "project-execution", number: "10", title: "إدارة وتنفيذ المشاريع", short: "رؤية واضحة تجمع التفاصيل في مسار واحد.", description: "تصوّر لخدمة تنظيم التنفيذ ومتابعة المراحل والتواصل بين الأطراف. تُحدَّد مسؤوليات المتابعة والتقارير والتنسيق والجدول الزمني ضمن اتفاق واضح يناسب المشروع.", focus: "وضوح المسؤوليات وتسلسل المراحل", icon: "management", group: "construction", approvalStatus: "pending" },
];

export const serviceGroups = [
  { id: "construction", title: "البناء والتنفيذ", english: "BUILD & EXECUTE", intro: "كل بناء يبدأ برؤية. وكل رؤية تحتاج إلى مسار واضح لتصبح مكانًا حيًا.", image: "engineering" },
  { id: "infrastructure", title: "البنية التحتية والأنظمة", english: "CONNECT & ENABLE", intro: "أنظمة تعمل بتناغم، وبنية أساسية ترتبط باحتياجات المكان وتفاصيله.", image: "about" },
  { id: "architecture", title: "العمارة وتفاصيل المكان", english: "REFINE & RESTORE", intro: "تكتمل قيمة المساحة بما نراه ونلمسه، وبالتفاصيل التي تجعلها أقرب إلى غايتها.", image: "hero" },
] as const;

export const networkCategories = [
  { id: "water", number: "01", title: "شبكات توزيع المياه", text: "تصوّر لمسارات توزيع المياه ونقاط الربط والأعمال المدنية المرتبطة بها.", icon: "water" },
  { id: "wastewater", number: "02", title: "شبكات الصرف الصحي", text: "تنسيق مسارات الصرف ومناسيبه وغرف التفتيش وفق متطلبات التصميم.", icon: "infrastructure" },
  { id: "stormwater", number: "03", title: "تصريف مياه الأمطار", text: "دراسة مسارات التجميع والتصريف وعلاقتها بالمناسيب والموقع.", icon: "water" },
  { id: "irrigation", number: "04", title: "شبكات الري", text: "تنظيم خطوط الري ونقاط التوزيع بما يتناسب مع مخطط الموقع.", icon: "landscape" },
  { id: "power", number: "05", title: "بنية التوزيع الكهربائي", text: "الأعمال المدنية ومسارات التمديد المرتبطة بمخططات التوزيع الكهربائي.", icon: "electrical" },
  { id: "telecom", number: "06", title: "مسارات الاتصالات", text: "قنوات التمديد والبنية المدنية المساندة لمسارات الاتصالات.", icon: "management" },
] as const;
