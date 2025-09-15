import { auth } from "@clerk/nextjs/server"

type UserPermission =
  | "job_listings:job_listings_create"
  | "job_listings:job_listings_update"
  | "job_listings:job_listings_delete"
  | "job_listings:job_listings_change_status"
  | "job_listings_applications:job_listing_applications_change_rating"
  | "job_listings_applications:job_listing_applications_change_stage"

export async function hasOrgUserPermission(permission: UserPermission) {
  const { has } = await auth()
  return has({ permission })
}