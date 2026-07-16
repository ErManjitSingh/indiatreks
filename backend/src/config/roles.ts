export const ROLES = [
  "super_admin",
  "admin",
  "seo_manager",
  "booking_manager",
  "content_manager",
  "operations_manager",
  "sales_manager",
  "support_executive",
  "viewer",
  "customer",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = {
  "users.read": ["super_admin", "admin", "support_executive", "viewer"],
  "users.write": ["super_admin", "admin"],
  "treks.read": [
    "super_admin",
    "admin",
    "content_manager",
    "seo_manager",
    "viewer",
    "operations_manager",
  ],
  "treks.write": ["super_admin", "admin", "content_manager"],
  "destinations.write": ["super_admin", "admin", "content_manager"],
  "blogs.write": ["super_admin", "admin", "content_manager", "seo_manager"],
  "bookings.read": [
    "super_admin",
    "admin",
    "booking_manager",
    "operations_manager",
    "sales_manager",
    "support_executive",
    "viewer",
  ],
  "bookings.write": [
    "super_admin",
    "admin",
    "booking_manager",
    "operations_manager",
    "sales_manager",
  ],
  "payments.read": ["super_admin", "admin", "booking_manager", "sales_manager"],
  "payments.write": ["super_admin", "admin", "booking_manager"],
  "coupons.write": ["super_admin", "admin", "sales_manager"],
  "reviews.moderate": ["super_admin", "admin", "content_manager", "support_executive"],
  "media.write": ["super_admin", "admin", "content_manager"],
  "seo.write": ["super_admin", "admin", "seo_manager", "content_manager"],
  "settings.write": ["super_admin", "admin"],
  "analytics.read": [
    "super_admin",
    "admin",
    "sales_manager",
    "viewer",
    "booking_manager",
  ],
  "enquiries.read": [
    "super_admin",
    "admin",
    "sales_manager",
    "support_executive",
    "operations_manager",
  ],
  "enquiries.write": ["super_admin", "admin", "sales_manager", "support_executive"],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function roleHasPermission(role: Role, permission: Permission): boolean {
  if (role === "super_admin") return true;
  return (PERMISSIONS[permission] as readonly string[]).includes(role);
}
