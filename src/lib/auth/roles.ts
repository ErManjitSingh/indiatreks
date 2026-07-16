export const STAFF_ROLES = [
  "super_admin",
  "admin",
  "seo_manager",
  "booking_manager",
  "content_manager",
  "operations_manager",
  "sales_manager",
  "support_executive",
  "viewer",
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export function isStaffRole(role?: string | null): boolean {
  if (!role) return false;
  return (STAFF_ROLES as readonly string[]).includes(role);
}

export function isAdminRole(role?: string | null): boolean {
  return role === "super_admin" || role === "admin" || role === "content_manager";
}
