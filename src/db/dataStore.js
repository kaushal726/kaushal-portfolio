import BusinessImage from "../assets/dbImage/business.jpg";

const eBillX = {
  name: "e-BillX",
  subtitle: "Inventory & Billing Platform",
  tagline:
    "Enterprise-grade, multi-tenant inventory management and billing SaaS for retailers and wholesalers.",
  version: "v1.0.0",
  image: BusinessImage,
  status: "Live",
  links: {
    live: "https://e-bill-rd3p.onrender.com/login",
    frontend: "https://github.com/kaushal726/e-bill-fe",
    backend: "https://github.com/kaushal726/e-billX-BE",
  },

  metrics: [
    { value: "14", label: "Modules" },
    { value: "13", label: "Schemas" },
    { value: "80+", label: "API Endpoints" },
    { value: "Multi-tenant", label: "Architecture" },
  ],

  highlights: [
    {
      icon: "tenant",
      title: "Multi-Tenant Architecture",
      description:
        "Each business operates with complete data isolation, scoped by adminId across every collection.",
    },
    {
      icon: "stock",
      title: "Real-Time Stock Management",
      description:
        "Automatic stock updates on every purchase, sale, and return — fully auditable history per product.",
    },
    {
      icon: "finance",
      title: "Comprehensive Financial Tracking",
      description:
        "Live monitoring of sales, purchases, profits, supplier dues, and customer outstanding.",
    },
    {
      icon: "staff",
      title: "Staff & Attendance",
      description:
        "Manage employees with check-in/check-out, roles, salaries, and exportable monthly reports.",
    },
    {
      icon: "excel",
      title: "Excel Import / Export",
      description:
        "Bulk operations across products, customers, suppliers, staff, and attendance via XLSX.",
    },
    {
      icon: "pdf",
      title: "PDF Invoice Generation",
      description:
        "Professional, branded invoices generated on the fly with PDFKit — itemized billing and totals.",
    },
    {
      icon: "security",
      title: "Hardened Security",
      description:
        "JWT auth, bcrypt password hashing, rate limiting, helmet headers, HPP prevention, CORS.",
    },
    {
      icon: "dashboard",
      title: "Live Business Dashboard",
      description:
        "Today's sales, monthly profit, low-stock alerts, attendance summary — aggregated in parallel.",
    },
  ],

  features: [
    {
      icon: "auth",
      title: "Authentication & Access",
      description:
        "Email-validated registration, JWT cookies, bcrypt password hashing, forgot-password flow, and per-admin data isolation.",
      points: [
        "JWT-based auth with HTTP-only cookies",
        "Subscription status & expiry tracking",
        "Profile view & edit endpoints",
      ],
    },
    {
      icon: "products",
      title: "Product Management",
      description:
        "Full CRUD with rich attributes — SKU, barcode, tax %, units, discount limits, and category/supplier links.",
      points: [
        "Search by name, SKU, or barcode",
        "Low-stock alerts & threshold per product",
        "Bulk Excel import / export",
      ],
    },
    {
      icon: "categories",
      title: "Categories",
      description:
        "Create, filter, and bulk-manage product categories with admin-scoped uniqueness.",
      points: [
        "Excel import / export",
        "Search & filter",
        "Hierarchical product organization",
      ],
    },
    {
      icon: "suppliers",
      title: "Supplier Management",
      description:
        "Track every supplier's profile, pending balance, and full purchase history with automated balance updates.",
      points: [
        "Phone & email validation",
        "Real-time pending-amount calculation",
        "Linked products & purchases",
      ],
    },
    {
      icon: "customers",
      title: "Customer Management",
      description:
        "Customer database with credit tracking, payment history, and automated due-amount calculation.",
      points: [
        "Outstanding balance per customer",
        "Excel import / export",
        "Quick search & filters",
      ],
    },
    {
      icon: "purchase",
      title: "Purchase (Stock IN)",
      description:
        "Create purchase orders that auto-increase stock, update supplier ledger, and log to stock history.",
      points: [
        "Multi-item invoices",
        "Auto stock + supplier balance update",
        "Payment status: pending / partial / paid",
      ],
    },
    {
      icon: "sale",
      title: "Sale (Stock OUT)",
      description:
        "Generate sale invoices with per-item discounts, stock validation, and automatic customer balance updates.",
      points: [
        "Stock availability checks before sale",
        "Item-wise discounts within limits",
        "Auto invoice numbering",
      ],
    },
    {
      icon: "purchaseReturn",
      title: "Purchase Returns",
      description:
        "Reverse purchases with stock adjustment, supplier-pending recalculation, and full audit trail.",
      points: [
        "Reference original purchase",
        "Auto stock reduction",
        "Supplier balance reduction",
      ],
    },
    {
      icon: "saleReturn",
      title: "Sale Returns",
      description:
        "Process customer returns with automatic stock restoration and customer-balance adjustment.",
      points: [
        "Reference original sale",
        "Auto stock restoration",
        "Customer balance reduction",
      ],
    },
    {
      icon: "payments",
      title: "Payment Tracking",
      description:
        "Record payments to suppliers and from customers across Cash, UPI, Bank Transfer, and Card modes.",
      points: [
        "Auto-reduce supplier dues / customer balance",
        "Per-payment notes & references",
        "Date-wise payment reports",
      ],
    },
    {
      icon: "stock",
      title: "Stock History",
      description:
        "Complete audit log of every stock movement — source, type, quantity, reference, and timestamp.",
      points: [
        "Filter by product, source, date range",
        "Manual stock adjustments supported",
        "Indexed for fast product lookups",
      ],
    },
    {
      icon: "staff",
      title: "Staff Management",
      description:
        "Manage employees with name, role, base salary, and join date — paginated for scale.",
      points: [
        "Pagination (10 per page, max 100)",
        "Validated mobile numbers",
        "Excel import / export",
      ],
    },
    {
      icon: "attendance",
      title: "Attendance",
      description:
        "Daily attendance with check-in/check-out, leave status, and monthly export to Excel.",
      points: [
        "Present / Absent / Leave / Half-day",
        "Per-staff attendance history",
        "Date-wise queries",
      ],
    },
    {
      icon: "dashboard",
      title: "Dashboard & Analytics",
      description:
        "Aggregated business overview computed in parallel — sales, purchases, dues, profit, alerts.",
      points: [
        "Today + monthly sales & purchases",
        "Total supplier / customer dues",
        "Low-stock alerts & business counts",
      ],
    },
  ],

  techStack: [
    {
      group: "Backend",
      items: [
        { name: "Node.js", note: "Runtime" },
        { name: "Express.js", note: "Framework" },
        { name: "JavaScript", note: "ES Modules" },
      ],
    },
    {
      group: "Database",
      items: [
        { name: "MongoDB", note: "NoSQL store" },
        { name: "Mongoose", note: "ODM" },
      ],
    },
    {
      group: "Security",
      items: [
        { name: "jsonwebtoken", note: "JWT" },
        { name: "bcrypt", note: "Password hashing" },
        { name: "helmet", note: "HTTP headers" },
        { name: "cors", note: "CORS" },
        { name: "express-rate-limit", note: "Rate limiting" },
        { name: "hpp", note: "Param pollution" },
      ],
    },
    {
      group: "Data & Files",
      items: [
        { name: "xlsx", note: "Excel I/O" },
        { name: "pdfkit", note: "PDF invoices" },
        { name: "validator", note: "Validation" },
        { name: "multer", note: "Uploads" },
      ],
    },
    {
      group: "Utilities",
      items: [
        { name: "moment", note: "Dates" },
        { name: "node-cron", note: "Scheduling" },
        { name: "dotenv", note: "Env config" },
        { name: "cookie-parser", note: "Cookies" },
      ],
    },
    {
      group: "Email",
      items: [
        { name: "nodemailer", note: "SMTP" },
        { name: "resend", note: "Email API" },
      ],
    },
    {
      group: "Frontend",
      items: [
        { name: "React", note: "UI library" },
        { name: "Axios", note: "HTTP client" },
      ],
    },
  ],

  workflows: [
    {
      title: "Purchase Workflow (Stock IN)",
      steps: [
        "Admin creates purchase: supplier + items + invoice number",
        "System validates supplier, products, and quantities",
        "Purchase record saved",
        "Stock increased per product",
        "Supplier pendingAmount updated",
        "Stock history logged (IN, source: purchase)",
      ],
    },
    {
      title: "Sale Workflow (Stock OUT)",
      steps: [
        "Admin creates sale: customer + items + discounts",
        "System validates stock availability and discount limits",
        "Sale recorded, invoice number generated",
        "Stock reduced per product",
        "Customer balance updated",
        "Stock history logged (OUT, source: sale)",
        "PDF invoice generated on demand",
      ],
    },
    {
      title: "Payment Workflow",
      steps: [
        "Admin records payment (to supplier or from customer)",
        "Amount validated against pending / balance",
        "Payment recorded with mode and notes",
        "Supplier dues or customer balance reduced",
        "Confirmation returned",
      ],
    },
  ],

  architecture: [
    "src/controller — 14 controllers, one per domain (sales, products, attendance…)",
    "src/models — 13 Mongoose schemas with admin-scoped indexes",
    "src/routes — modular route files aggregated via mainRoutes.js",
    "src/middlewares — JWT auth + multer file uploads",
    "src/helper — response helpers, validation, Excel utilities, constants",
    "src/Services — mailer, resend integration, scheduled cron jobs",
    "src/Security — security middleware setup and CORS config",
    "src/dbConfig — MongoDB connection",
  ],
};

const dataStore = [eBillX];

export default dataStore;
export { eBillX };
